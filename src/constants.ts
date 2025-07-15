export const ERC2771Forwarder = "0x52C0De18D999E11436776fa45800bb92d57b752c";
export const Deploy = "0x58BE10d8D126DD9bd2BCdc84a424b26A20e2e896";

export interface Lesson {
  id: number;
  lessontitle: string;
  url: string[];
  quizzes: string;
}

export interface Course {
  id: bigint;
  title: string;
  description: string;
  longDescription: string;
  objectives: string[];
  instructor: string;
  url: string;
  level: string;
  category: string;
  prerequisites: string[];
  lessons: Lesson[];
  duration: string;
}

export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_forwarder",
        type: "address",
      },
      {
        internalType: "address",
        name: "_reverse",
        type: "address",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
    ],
    name: "CourseEnrolled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "courseId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "progress",
        type: "uint8",
      },
    ],
    name: "ProgressUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "completedLessons",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "courseCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "courseFactory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "courses",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "string",
        name: "longDescription",
        type: "string",
      },
      {
        internalType: "string",
        name: "instructor",
        type: "string",
      },
      {
        internalType: "string",
        name: "url",
        type: "string",
      },
      {
        internalType: "string",
        name: "level",
        type: "string",
      },
      {
        internalType: "string",
        name: "category",
        type: "string",
      },
      {
        internalType: "string",
        name: "duration",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "enroll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllParticipants",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "getCourse",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "longDescription",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "objectives",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "prerequisites",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "instructor",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "string",
            name: "level",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "duration",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "lessontitle",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "url",
                type: "string[]",
              },
              {
                internalType: "string",
                name: "quizzes",
                type: "string",
              },
            ],
            internalType: "struct ILevel3Course.Lesson[]",
            name: "lessons",
            type: "tuple[]",
          },
        ],
        internalType: "struct ILevel3Course.Course",
        name: "",
        type: "tuple",
      },
      {
        internalType: "bool",
        name: "enrolled",
        type: "bool",
      },
      {
        internalType: "uint8",
        name: "score",
        type: "uint8",
      },
      {
        internalType: "uint256[]",
        name: "lessonIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256",
        name: "attendees",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCourses",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "longDescription",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "objectives",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "prerequisites",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "instructor",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "string",
            name: "level",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "duration",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "lessontitle",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "url",
                type: "string[]",
              },
              {
                internalType: "string",
                name: "quizzes",
                type: "string",
              },
            ],
            internalType: "struct ILevel3Course.Lesson[]",
            name: "lessons",
            type: "tuple[]",
          },
        ],
        internalType: "struct ILevel3Course.Course[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "forwarder",
        type: "address",
      },
    ],
    name: "isTrustedForwarder",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numCourses",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
    ],
    name: "numParticipants",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "participants",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "progress",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "reverse",
    outputs: [
      {
        internalType: "contract IReverseRegistrar",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address",
      },
    ],
    name: "setCourseFactory",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "trustedForwarder",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "longDescription",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "objectives",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "prerequisites",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "instructor",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "string",
            name: "level",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "duration",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "lessontitle",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "url",
                type: "string[]",
              },
              {
                internalType: "string",
                name: "quizzes",
                type: "string",
              },
            ],
            internalType: "struct ILevel3Course.Lesson[]",
            name: "lessons",
            type: "tuple[]",
          },
        ],
        internalType: "struct ILevel3Course.Course",
        name: "course",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "coursecounter",
        type: "uint256",
      },
    ],
    name: "updateCourse",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_courseId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lessonId",
        type: "uint256",
      },
      {
        internalType: "uint8",
        name: "_progress",
        type: "uint8",
      },
    ],
    name: "updateCourseProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "longDescription",
            type: "string",
          },
          {
            internalType: "string[]",
            name: "objectives",
            type: "string[]",
          },
          {
            internalType: "string[]",
            name: "prerequisites",
            type: "string[]",
          },
          {
            internalType: "string",
            name: "instructor",
            type: "string",
          },
          {
            internalType: "string",
            name: "url",
            type: "string",
          },
          {
            internalType: "string",
            name: "level",
            type: "string",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "string",
            name: "duration",
            type: "string",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "string",
                name: "lessontitle",
                type: "string",
              },
              {
                internalType: "string[]",
                name: "url",
                type: "string[]",
              },
              {
                internalType: "string",
                name: "quizzes",
                type: "string",
              },
            ],
            internalType: "struct ILevel3Course.Lesson[]",
            name: "lessons",
            type: "tuple[]",
          },
        ],
        internalType: "struct ILevel3Course.Course",
        name: "course",
        type: "tuple",
      },
      {
        internalType: "uint256",
        name: "coursecounter",
        type: "uint256",
      },
    ],
    name: "updateCourseRegistry",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];