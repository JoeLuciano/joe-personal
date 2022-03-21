import os
import csv
from flask import Blueprint, request
from flask_cors import cross_origin
from backend import limiter
from backend.backend import Message
from datetime import date
import pathlib
import hashlib

tweedle = Blueprint('tweedle', __name__)

cwd = pathlib.Path(__file__).parent.resolve()
tweedles_csv = os.path.join(cwd, "worddb.csv")
total_tweedles = 12920

today = date.today()
daily_tweedle_index_str = str(today.year + today.month + today.day).encode()
daily_tweedle_index_hex = hashlib.sha256(daily_tweedle_index_str).hexdigest()
daily_tweedle_index = int(daily_tweedle_index_hex, 16) % total_tweedles + 1

daily_tweedle = ''
with open(tweedles_csv) as f:
    daily_tweedle = (next((x for i, x in enumerate(csv.reader(f))
                           if i == daily_tweedle_index), None))[0]
daily_tweedle = daily_tweedle.split("'")[1]


@tweedle.route('/api/tweedle', methods=['POST'])
@limiter.limit("6 per minute")
@cross_origin()
def getTweedleMatches():
    try:
        tweedleGuess = request.json
        if tweedleGuess == daily_tweedle:
            return Message.data(message="", data=['match'] * 5), 200
        else:
            return process_wrong_guess(tweedleGuess, daily_tweedle)
    except Exception as e:
        return Message.error(e), 400


def get_guess_results(tweedleGuess, dailyTweedle):
    guessResults = []
    for (guess, actual) in zip(tweedleGuess, dailyTweedle):
        if guess == actual:
            guessResults.append('match')
        elif guess in dailyTweedle:
            guessResults.append('close')
        else:
            guessResults.append('miss')
    return guessResults


def process_wrong_guess(tweedleGuess, dailyTweedle):
    with open(tweedles_csv, 'rt') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if tweedleGuess in row[0]:
                guessResults = get_guess_results(tweedleGuess, dailyTweedle)
                return Message.data(message="", data=guessResults), 200
        return Message.msg('Not a word Tweedle Dum!'), 412
