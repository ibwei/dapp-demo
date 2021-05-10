// SPDX-License-Identifier: MIT
//pragma关键字：版本申明。
//用来指示编译器将代码编译成特定版本，以免引起兼容性问题
//此处不支持0.4.0之前的编译器，也不支持0.5.0之后的编译器（条件为 ^）

//contract关键字：合约申明
//和Java、PHP中的class类似
//此处是申明一个名为Hello的合约

pragma solidity >=0.4.21 <0.7.0;


contract Hello {

    //public: 函数访问属性(后续文章为详细阐述)
    //returns (string): 定义返回值类型为string
   function say(string memory name) public returns (string memory) {
        return name;
   }
}
