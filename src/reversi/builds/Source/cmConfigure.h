/* Distributed under the OSI-approved BSD 3-Clause License.  See accompanying
   file Copyright.txt or https://cmake.org/licensing for details.  */
#pragma once

#include "cmsys/Configure.hxx" // IWYU pragma: export

#ifdef _MSC_VER
#pragma warning(disable : 4786)
#pragma warning(disable : 4503)
#endif

#ifdef __ICL
#pragma warning(disable : 985)
#pragma warning(disable : 1572) /* floating-point equality test */
#endif

#define HAVE_ENVIRON_NOT_REQUIRE_PROTOTYPE
/* #undef HAVE_UNSETENV */
/* #undef CMake_USE_ELF_PARSER */
/* #undef CMake_USE_MACH_PARSER */
/* #undef CMake_USE_XCOFF_PARSER */
#define CMake_DEFAULT_RECURSION_LIMIT 400
#define CMAKE_BIN_DIR "/bin"
#define CMAKE_DATA_DIR "/share/cmake-3.21"
#define CMAKE_DOC_DIR "/doc/cmake-3.21"

#define CM_FALLTHROUGH cmsys_FALLTHROUGH

#if defined(_WIN32) && !defined(NOMINMAX)
#  define NOMINMAX
#endif
