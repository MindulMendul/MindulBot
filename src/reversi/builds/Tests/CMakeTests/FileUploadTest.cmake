file(REMOVE_RECURSE "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads")

if(EXISTS "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads/file1.png")
  message(FATAL_ERROR "error: file1.png exists - should have been deleted")
endif()
if(EXISTS "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads/file2.png")
  message(FATAL_ERROR "error: file2.png exists - should have been deleted")
endif()

file(MAKE_DIRECTORY "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads")

set(filename "C:/Users/leesj/Desktop/DiscordBot/src/reversi/opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Tests/CMakeTests/FileDownloadInput.png")
if(NOT "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests" MATCHES "^/")
  set(slash /)
endif()
set(urlbase "file://${slash}C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads")

message(STATUS "FileUpload:1")
file(UPLOAD
  ${filename}
  ${urlbase}/file1.png
  TIMEOUT 2
  )

message(STATUS "FileUpload:2")
file(UPLOAD
  ${filename}
  ${urlbase}/file2.png
  STATUS status
  LOG log
  SHOW_PROGRESS
  )

execute_process(COMMAND ${CMAKE_COMMAND} -E md5sum
  "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads/file1.png"
  OUTPUT_VARIABLE sum1
  OUTPUT_STRIP_TRAILING_WHITESPACE)
if(NOT sum1 MATCHES "^dbd330d52f4dbd60115d4191904ded92  .*/uploads/file1.png$")
  message(FATAL_ERROR "file1.png did not upload correctly (sum1='${sum1}')")
endif()

execute_process(COMMAND ${CMAKE_COMMAND} -E md5sum
  "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CMakeTests/uploads/file2.png"
  OUTPUT_VARIABLE sum2
  OUTPUT_STRIP_TRAILING_WHITESPACE)
if(NOT sum2 MATCHES "^dbd330d52f4dbd60115d4191904ded92  .*/uploads/file2.png$")
  message(FATAL_ERROR "file2.png did not upload correctly (sum2='${sum2}')")
endif()

message(STATUS "log='${log}'")
message(STATUS "status='${status}'")
message(STATUS "DONE")
