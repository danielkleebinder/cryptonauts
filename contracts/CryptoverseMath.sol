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

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(int a, int b) internal pure returns (int) {
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}