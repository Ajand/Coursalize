// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";

contract Courses is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _courseIds;
    Counters.Counter private _userIds;

    ITablelandTables private _tableland;
    string private _tablePrefix = "coursalize";

    mapping(address => bool) public _users;

    // Courses Table
    string private _courseTable;
    uint256 private _courseTableId;

    // Lecture Table
    string private _lectureTable;
    uint256 private _lectureTableId;

    // Users Table
    string private _userTable;
    uint256 private _userTableId;

    // Reviews Table
    string private _reviewTable;
    uint256 private _reviewTableId;

    string private _baseURIString =
        "https://testnet.tableland.network/query?s=";

    constructor(address registry) ERC1155(_baseURIString) {
        _tableland = ITablelandTables(registry);

        // Course Table
        _courseTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_course",
                "_",
                Strings.toString(block.chainid),
                " (id int, title text, category int, description text, cover text, price int, instructor text);"
            )
        );

        _courseTable = string.concat(
            _tablePrefix,
            "_course",
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_courseTableId)
        );

        // Lecture Table
        _lectureTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_lecture",
                "_",
                Strings.toString(block.chainid),
                " (id int, courseId int, name text, description text, media text);"
            )
        );

        _lectureTable = string.concat(
            _tablePrefix,
            "_lecture",
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_lectureTableId)
        );

        // Users Table

        _userTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_",
                Strings.toString(block.chainid),
                " (id int, display_name text, headline text, bio text, address text, avatar text);"
            )
        );

        _userTable = string.concat(
            _tablePrefix,
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_userTableId)
        );

        // Reviews Table
        _reviewTableId = _tableland.createTable(
            address(this),
            string.concat(
                "CREATE TABLE ",
                _tablePrefix,
                "_review",
                "_",
                Strings.toString(block.chainid),
                " (id text, display_name text, headline text, bio text, avatar text);"
            )
        );

        _reviewTable = string.concat(
            _tablePrefix,
            "_review",
            "_",
            Strings.toString(block.chainid),
            "_",
            Strings.toString(_reviewTableId)
        );
    }

    function courseURI() public view returns (string memory) {
        return
            string.concat(_baseURIString, "SELECT%20*%20FROM%20", _courseTable);
    }

    function lectureURI() public view returns (string memory) {
        return
            string.concat(
                _baseURIString,
                "SELECT%20*%20FROM%20",
                _lectureTable
            );
    }

    function userURI() public view returns (string memory) {
        return
            string.concat(_baseURIString, "SELECT%20*%20FROM%20", _userTable);
    }

    function reviewURI() public view returns (string memory) {
        return
            string.concat(_baseURIString, "SELECT%20*%20FROM%20", _reviewTable);
    }

    function setUser(
        string memory _name,
        string memory _headline,
        string memory _bio,
        string memory _avatar
    ) public {
        if (_users[msg.sender] == true) {
            _tableland.runSQL(
                address(this),
                _userTableId,
                string.concat(
                    "UPDATE ",
                    _userTable,
                    " SET display_name = '",
                    _name,
                    "', headline = '",
                    _headline,
                    "', bio = '",
                    _bio,
                    "', avatar = '",
                    _avatar,
                    "' WHERE address = '",
                    Strings.toHexString(uint160(msg.sender), 20),
                    "';"
                )
            );
        } else {
            uint256 newItemId = _userIds.current();
            _tableland.runSQL(
                address(this),
                _userTableId,
                string.concat(
                    "INSERT INTO ",
                    _userTable,
                    " (id, display_name, headline, bio, address, avatar) VALUES (",
                    Strings.toString(newItemId),
                    ", '",
                    _name,
                    "', '",
                    _headline,
                    "', '",
                    _bio,
                    "', '",
                    Strings.toHexString(uint160(msg.sender), 20),
                    "', '",
                    _avatar,
                    "')"
                )
            );
            _userIds.increment();
            _users[msg.sender] = true;
        }
    }
}
