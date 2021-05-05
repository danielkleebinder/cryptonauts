// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @dev Standard math utilities missing in the Solidity language.
 */
library CryptoverseMath {
    /**
     * @dev Returns the largest of two numbers.
     */
    function max(int a, int b) internal pure returns (int) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(int a, int b) internal pure returns (int) {
        return a < b ? a : b;
    }
}