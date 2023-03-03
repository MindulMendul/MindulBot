import base64
import sys
from gtts import gTTS

# str='테스트용 문장은 상당히 길기 때문에 호흡을 길게 가져가지 않으면 길게 가져간 사람보다 상대적으로 불리할 수 있어 호흡을 길게 가져가려고 노력 중에 있을지도 모릅니다. 침착맨은 안산 출신으로서 평범한 사람이라면 기겁할 만한 일도 안산은 이게 일상이라며 조금도 놀라워하지 않는 반응을 보입니다. 침착맨은 주펄의 양말을 벗기기 위해 온갖 발악을 하는데, 주펄의 양말은 침착맨의 힘으로도 쉽게 벗겨지지 않는 강력한 양말이기 때문에 오늘도 세상은 평화롭습니다.'

def saveTTS(text):
  tts=gTTS(
    text=text,
    lang='ko', slow=False
  )
  stream=tts.stream()
  while True:
    try:
      print(base64.b64encode(next(stream)))
    except StopIteration:
      break

saveTTS(sys.argv[1])