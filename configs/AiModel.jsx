/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
 
    export const GenerateCourseLayout_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Genrate A Course tutoriel following detail with field as course name,description,along with chapter name,about,duration:category:'Programing',Topic:Python ,Level :Basic,Duration:1 hour,NoOf Chapters:5,in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"course_name\": \"Python for Beginners\",\n  \"description\": \"This course provides a comprehensive introduction to the Python programming language. You will learn the fundamentals of programming, including variables, data types, operators, control flow, and functions. By the end of the course, you will be able to write basic Python programs and solve simple programming problems.\",\n  \"chapters\": [\n    {\n      \"chapter_name\": \"Introduction to Python\",\n      \"about\": \"This chapter introduces the Python programming language, its history, and its applications. You will learn how to install Python and set up your development environment.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapter_name\": \"Variables and Data Types\",\n      \"about\": \"This chapter covers the concept of variables, different data types in Python, and how to assign values to variables.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapter_name\": \"Operators and Expressions\",\n      \"about\": \"This chapter explores various operators used in Python, including arithmetic, comparison, logical, and bitwise operators. You will learn how to create and evaluate expressions.\",\n      \"duration\": \"20 minutes\"\n    },\n    {\n      \"chapter_name\": \"Control Flow\",\n      \"about\": \"This chapter focuses on control flow statements, including conditional statements (if, elif, else) and looping structures (for, while). You will learn how to control the execution flow of your programs.\",\n      \"duration\": \"15 minutes\"\n    },\n    {\n      \"chapter_name\": \"Functions\",\n      \"about\": \"This chapter introduces the concept of functions, their definition, calling, and arguments. You will learn how to create reusable code blocks in Python.\",\n      \"duration\": \"10 minutes\"\n    }\n  ],\n  \"category\": \"Programming\",\n  \"topic\": \"Python\",\n  \"level\": \"Basic\",\n  \"duration\": \"1 hour\",\n  \"no_of_chapters\": 5\n}\n``` \n"},
          ],
        },
      ],
    });
    export const GenerateChapterContent_AI = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Explain the concept in Detail on Topic:python,Chapter:Object-Oriented Programming 2025, in JSON Format with list of array, with fields as title, description in detail, Code Example (Code field in <precode> format) if applicable\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n[\n  {\n    \"title\": \"Introduction to Object-Oriented Programming (OOP)\",\n    \"description\": \"Object-Oriented Programming (OOP) is a programming paradigm that revolves around the concept of 'objects'. An object is a self-contained entity that encapsulates data (attributes) and behavior (methods). OOP aims to structure code in a way that mimics real-world entities and their interactions.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Key Concepts in OOP\",\n    \"description\": \"OOP encompasses several fundamental concepts that are essential for understanding its principles:\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Classes\",\n    \"description\": \"A class is a blueprint or template that defines the attributes and methods for objects of that class. It acts as a pattern for creating objects, specifying their structure and behavior.\",\n    \"code\": \"<precode>\\nclass Dog:\\n    def __init__(self, name, breed):\\n        self.name = name\\n        self.breed = breed\\n    \\n    def bark(self):\\n        print('Woof!')\\n</precode>\"\n  },\n  {\n    \"title\": \"Objects\",\n    \"description\": \"An object is an instance of a class. It is a concrete realization of the blueprint defined by the class. Each object possesses its own set of data (attribute values) and shares the same methods as other objects of the same class.\",\n    \"code\": \"<precode>\\nmy_dog = Dog('Buddy', 'Golden Retriever')\\nprint(my_dog.name)  # Output: Buddy\\nmy_dog.bark()      # Output: Woof!\\n</precode>\"\n  },\n  {\n    \"title\": \"Attributes\",\n    \"description\": \"Attributes are the characteristics or properties of an object. They represent the data associated with an object. In the Dog class example, 'name' and 'breed' are attributes.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Methods\",\n    \"description\": \"Methods define the actions or behaviors that an object can perform. They are functions associated with a class that operate on the object's data. The 'bark()' method in the Dog class is an example.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Encapsulation\",\n    \"description\": \"Encapsulation is the bundling of data (attributes) and methods within a class. It hides the internal implementation details from the outside world, providing a controlled interface for interacting with the object. This promotes data protection and code organization.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Abstraction\",\n    \"description\": \"Abstraction focuses on essential features of an object while hiding unnecessary details. This simplifies the interaction with objects by presenting only the relevant information. It allows for code reusability and flexibility.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Inheritance\",\n    \"description\": \"Inheritance allows creating new classes (child classes) that inherit properties and methods from existing classes (parent classes). This fosters code reuse and promotes a hierarchical relationship between classes. Child classes can extend or modify the inherited behaviors.\",\n    \"code\": \"<precode>\\nclass Animal:\\n    def __init__(self, name):\\n        self.name = name\\n    \\n    def speak(self):\\n        print('Generic animal sound')\\n\\nclass Dog(Animal):\\n    def speak(self):\\n        print('Woof!')\\n\\nmy_dog = Dog('Buddy')\\nmy_dog.speak()  # Output: Woof!\\n</precode>\"\n  },\n  {\n    \"title\": \"Polymorphism\",\n    \"description\": \"Polymorphism means 'many forms'. In OOP, it allows objects of different classes to be treated in a uniform way through a common interface. This enables flexibility and extensibility in code, as objects can be handled generically regardless of their specific type.\",\n    \"code\": \"<precode>\\nclass Cat(Animal):\\n    def speak(self):\\n        print('Meow!')\\n\\nanimals = [Dog('Buddy'), Cat('Whiskers')]\\nfor animal in animals:\\n    animal.speak()\\n\\n# Output:\\n# Woof!\\n# Meow!\\n</precode>\"\n  },\n  {\n    \"title\": \"Benefits of OOP\",\n    \"description\": \"Object-Oriented Programming offers several advantages:\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Code Reusability\",\n    \"description\": \"Inheritance allows reusing existing code in new classes, reducing development time and effort.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Modularity\",\n    \"description\": \"OOP promotes code organization by breaking down complex systems into smaller, self-contained objects.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Maintainability\",\n    \"description\": \"Encapsulation and modularity make code easier to understand, modify, and maintain.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Data Security\",\n    \"description\": \"Encapsulation protects data by controlling access to it, enhancing data integrity and security.\",\n    \"code\": \"\"\n  },\n  {\n    \"title\": \"Flexibility and Extensibility\",\n    \"description\": \"OOP allows for easy adaptation to changing requirements, facilitating code evolution and expansion.\",\n    \"code\": \"\"\n  }\n]\n```"},
          ],
        },
      ],
    });
  
    // const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    // console.log(result.response.text());
