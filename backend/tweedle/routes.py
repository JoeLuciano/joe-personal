import os
import enchant
from flask import Blueprint, request
from flask_cors import cross_origin
from backend.backend import Message

tweedle = Blueprint('tweedle', __name__)

spellChecker = enchant.Dict("en_US")


@tweedle.route('/api/tweedle', methods=['POST'])
@cross_origin()
def getTweedleMatches():
    try:
        tweedleGuess = request.json
        dailyTweedle = os.getenv('DAILY_WORDLE')
        guessResults = []
        if spellChecker.check(tweedleGuess):
            for (guess, actual) in zip(tweedleGuess, dailyTweedle):
                if guess == actual:
                    guessResults.append('match')
                elif guess in dailyTweedle:
                    guessResults.append('close')
                else:
                    guessResults.append('miss')
            return Message.data(message="", data=guessResults), 200
        else:
            return Message.msg('Not a word Tweedle Dum!'), 412
    except Exception as e:
        return Message.error(e), 400
