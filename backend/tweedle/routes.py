import os
import csv
from flask import Blueprint, request
from flask_cors import cross_origin
from backend.backend import Message

tweedle = Blueprint('tweedle', __name__)


@tweedle.route('/api/tweedle', methods=['POST'])
@cross_origin()
def getTweedleMatches():
    try:
        tweedleGuess = request.json
        dailyTweedle = os.getenv('DAILY_WORDLE')
        if tweedleGuess == dailyTweedle:
            return Message.data(message="", data=['match'] * 5), 200
        else:
            return process_wrong_guess(tweedleGuess, dailyTweedle)
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
    __location__ = os.path.realpath(
        os.path.join(os.getcwd(), os.path.dirname(__file__)))
    with open(os.path.join(__location__, 'worddb.csv'), 'rt') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            if tweedleGuess in row[0]:
                guessResults = get_guess_results(tweedleGuess, dailyTweedle)
                return Message.data(message="", data=guessResults), 200
        return Message.msg('Not a word Tweedle Dum!'), 412
