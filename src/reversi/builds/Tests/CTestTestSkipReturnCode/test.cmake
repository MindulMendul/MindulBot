cmake_minimum_required(VERSION 2.8.12)

# Settings:
set(CTEST_DASHBOARD_ROOT                "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CTestTest")
set(CTEST_SITE                          "Mindul-Laptop")
set(CTEST_BUILD_NAME                    "CTestTest-Win32-mingw32-make-SkipReturnCode")

set(CTEST_SOURCE_DIRECTORY              "C:/Users/leesj/Desktop/DiscordBot/src/reversi/opencv_sources/cmake-3.21.0-rc1/cmake-3.21.0-rc1/Tests/CTestTestSkipReturnCode")
set(CTEST_BINARY_DIRECTORY              "C:/Users/leesj/Desktop/DiscordBot/src/reversi/builds/Tests/CTestTestSkipReturnCode")
set(CTEST_CVS_COMMAND                   "")
set(CTEST_CMAKE_GENERATOR               "MinGW Makefiles")
set(CTEST_CMAKE_GENERATOR_PLATFORM      "")
set(CTEST_CMAKE_GENERATOR_TOOLSET       "")
set(CTEST_BUILD_CONFIGURATION           "$ENV{CMAKE_CONFIG_TYPE}")
set(CTEST_COVERAGE_COMMAND              "C:/MinGW/bin/gcov.exe")
set(CTEST_NOTES_FILES                   "${CTEST_SCRIPT_DIRECTORY}/${CTEST_SCRIPT_NAME}")

#CTEST_EMPTY_BINARY_DIRECTORY(${CTEST_BINARY_DIRECTORY})

CTEST_START(Experimental)
CTEST_CONFIGURE(BUILD "${CTEST_BINARY_DIRECTORY}" RETURN_VALUE res)
CTEST_BUILD(BUILD "${CTEST_BINARY_DIRECTORY}" RETURN_VALUE res)
CTEST_TEST(BUILD "${CTEST_BINARY_DIRECTORY}" RETURN_VALUE res)
