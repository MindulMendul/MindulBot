check_files("${RunCMake_TEST_BINARY_DIR}"
  INCLUDE
    ${TARGET_DEPENDS_SubdirCommand}
    ${TARGET_DEPENDS_TopCommand}
    ${TARGET_BYPRODUCTS_SubdirTarget}
  )
check_file_contents("${TARGET_BYPRODUCTS_SubdirTarget}" "^Genex config: Release\nINTDIR config: Release\n$")
