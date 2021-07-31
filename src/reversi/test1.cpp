#include <stdio.h>
#include "test.hpp"

int printTest(void){
    printf("hello test world");
    return 0;
}

int main(void){
    return printTest();
}

