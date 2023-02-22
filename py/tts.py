import discord
from discord.ext import commands
import time
import asyncio

from gtts import gTTS
import sys


def tts(text):
  i=1
  tts=gTTS(
    text=text,
    lang='ko', slow=False
  )
  print(text.strip())
  tts.save(f'./py/asset/ttsFile/text{i}.mp3')

tts(sys.argv[1])
