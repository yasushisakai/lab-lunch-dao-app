export type LabLunchDao = {
  "version": "0.1.0",
  "name": "lab_lunch_dao",
  "instructions": [
    {
      "name": "initGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "addMembersToGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newMembers",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateQuorum",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newQuorum",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initCaterList",
      "accounts": [
        {
          "name": "list",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pushCater",
      "accounts": [
        {
          "name": "caterList",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cater",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    },
    {
      "name": "pushMenu",
      "accounts": [
        {
          "name": "cater",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "menu",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "footPrint",
          "type": "f32"
        },
        {
          "name": "cost",
          "type": "f32"
        }
      ]
    },
    {
      "name": "createLunchTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cater",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "voteDue",
          "type": "i64"
        },
        {
          "name": "when",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCaterTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "caterList",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "voteDue",
          "type": "i64"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "topic",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "votes",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "updateBallot",
      "accounts": [
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "topic",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "votes",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "finalizeTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "result",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "seqNo",
            "type": "u64"
          },
          {
            "name": "quorum",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "caterList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caters",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "caterItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caterList",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "menus",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "menuItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cater",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "footPrint",
            "type": "f32"
          },
          {
            "name": "cost",
            "type": "f32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "topic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "seqNo",
            "type": "u64"
          },
          {
            "name": "finalized",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "voteDue",
            "type": "i64"
          },
          {
            "name": "quorum",
            "type": "u8"
          },
          {
            "name": "voteNum",
            "type": "u8"
          },
          {
            "name": "options",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "finalizedTopic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ballot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "topic",
            "type": "publicKey"
          },
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "approvals",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAllowedToUpdateGroup",
      "msg": "only first member can change the group"
    },
    {
      "code": 6001,
      "name": "FullGroup",
      "msg": "group is full"
    },
    {
      "code": 6002,
      "name": "GroupNotUnique",
      "msg": "group members must not overlap"
    },
    {
      "code": 6003,
      "name": "InvalidQuorum",
      "msg": "quorum should be larger than 0 and lower than the total number of members"
    },
    {
      "code": 6004,
      "name": "NoDuplicateAllowed",
      "msg": "list items needs to be unique"
    },
    {
      "code": 6005,
      "name": "FullList",
      "msg": "List is full"
    },
    {
      "code": 6006,
      "name": "StringTooLong",
      "msg": "String is too long"
    },
    {
      "code": 6007,
      "name": "SeqNoMismatch",
      "msg": "Sequence Number Mismatch"
    },
    {
      "code": 6008,
      "name": "VoterNotMember",
      "msg": "Voter Not Found in Member List"
    },
    {
      "code": 6009,
      "name": "OptionVotesMismatch",
      "msg": "Option and Votes do not match"
    },
    {
      "code": 6010,
      "name": "TopicClosed",
      "msg": "Topic is closed"
    },
    {
      "code": 6011,
      "name": "TopicStillRunning",
      "msg": "Topic still has time left until closing"
    },
    {
      "code": 6012,
      "name": "TopicDidNotReachQuorum",
      "msg": "Topic needs equal or more participants than the quorum"
    }
  ]
};

export const IDL: LabLunchDao = {
  "version": "0.1.0",
  "name": "lab_lunch_dao",
  "instructions": [
    {
      "name": "initGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        }
      ]
    },
    {
      "name": "addMembersToGroup",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newMembers",
          "type": {
            "vec": "publicKey"
          }
        }
      ]
    },
    {
      "name": "updateQuorum",
      "accounts": [
        {
          "name": "group",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "newQuorum",
          "type": "u8"
        }
      ]
    },
    {
      "name": "initCaterList",
      "accounts": [
        {
          "name": "list",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "pushCater",
      "accounts": [
        {
          "name": "caterList",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "cater",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "url",
          "type": "string"
        }
      ]
    },
    {
      "name": "pushMenu",
      "accounts": [
        {
          "name": "cater",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "menu",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "footPrint",
          "type": "f32"
        },
        {
          "name": "cost",
          "type": "f32"
        }
      ]
    },
    {
      "name": "createLunchTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "cater",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "voteDue",
          "type": "i64"
        },
        {
          "name": "when",
          "type": "string"
        }
      ]
    },
    {
      "name": "createCaterTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "owner",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "caterList",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "voteDue",
          "type": "i64"
        }
      ]
    },
    {
      "name": "vote",
      "accounts": [
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "voter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "topic",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "votes",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "updateBallot",
      "accounts": [
        {
          "name": "ballot",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "topic",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "votes",
          "type": {
            "vec": "bool"
          }
        }
      ]
    },
    {
      "name": "finalizeTopic",
      "accounts": [
        {
          "name": "topic",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "result",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "group",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "group",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "members",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "seqNo",
            "type": "u64"
          },
          {
            "name": "quorum",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "caterList",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caters",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "authority",
            "type": "publicKey"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "caterItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "caterList",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "url",
            "type": "string"
          },
          {
            "name": "menus",
            "type": {
              "vec": "publicKey"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "menuItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "cater",
            "type": "publicKey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "footPrint",
            "type": "f32"
          },
          {
            "name": "cost",
            "type": "f32"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "topic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "group",
            "type": "publicKey"
          },
          {
            "name": "seqNo",
            "type": "u64"
          },
          {
            "name": "finalized",
            "type": "bool"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "voteDue",
            "type": "i64"
          },
          {
            "name": "quorum",
            "type": "u8"
          },
          {
            "name": "voteNum",
            "type": "u8"
          },
          {
            "name": "options",
            "type": {
              "vec": "publicKey"
            }
          }
        ]
      }
    },
    {
      "name": "finalizedTopic",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "votes",
            "type": "bytes"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ballot",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "topic",
            "type": "publicKey"
          },
          {
            "name": "voter",
            "type": "publicKey"
          },
          {
            "name": "approvals",
            "type": {
              "vec": "bool"
            }
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "NotAllowedToUpdateGroup",
      "msg": "only first member can change the group"
    },
    {
      "code": 6001,
      "name": "FullGroup",
      "msg": "group is full"
    },
    {
      "code": 6002,
      "name": "GroupNotUnique",
      "msg": "group members must not overlap"
    },
    {
      "code": 6003,
      "name": "InvalidQuorum",
      "msg": "quorum should be larger than 0 and lower than the total number of members"
    },
    {
      "code": 6004,
      "name": "NoDuplicateAllowed",
      "msg": "list items needs to be unique"
    },
    {
      "code": 6005,
      "name": "FullList",
      "msg": "List is full"
    },
    {
      "code": 6006,
      "name": "StringTooLong",
      "msg": "String is too long"
    },
    {
      "code": 6007,
      "name": "SeqNoMismatch",
      "msg": "Sequence Number Mismatch"
    },
    {
      "code": 6008,
      "name": "VoterNotMember",
      "msg": "Voter Not Found in Member List"
    },
    {
      "code": 6009,
      "name": "OptionVotesMismatch",
      "msg": "Option and Votes do not match"
    },
    {
      "code": 6010,
      "name": "TopicClosed",
      "msg": "Topic is closed"
    },
    {
      "code": 6011,
      "name": "TopicStillRunning",
      "msg": "Topic still has time left until closing"
    },
    {
      "code": 6012,
      "name": "TopicDidNotReachQuorum",
      "msg": "Topic needs equal or more participants than the quorum"
    }
  ]
};
