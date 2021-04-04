# https://www.codewars.com/kata/517abf86da9663f1d2000003/train/python

from re import sub

def to_camel_case(text):
    separator = '@@@'
    words = sub('(_|-)', separator, text)
    words = words.split(separator)
    first_word = words[0]
    from_second_word = words[1:]
    camel_words = []
    for word in from_second_word:
        camel_words.append(word[0].upper() + word[1:])
    return first_word + ''.join(camel_words)


print(to_camel_case('hello_world'))
print(to_camel_case('this-is-a-sentence'))
print(to_camel_case('This-is-another-sentence'))
