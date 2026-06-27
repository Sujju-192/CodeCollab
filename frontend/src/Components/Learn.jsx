import React, { useState, useEffect } from 'react';

const Learn = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [activeTopic, setActiveTopic] = useState('introduction');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Comprehensive documentation data with all 5 languages
  const documentationData = {
    javascript: {
      introduction: {
        title: "Introduction to JavaScript",
        content: `
JavaScript is a versatile, high-level programming language primarily used for web development. 
It enables interactive web pages and is an essential part of web applications.

**Key Features:**
- Client-side scripting
- Event-driven programming
- Prototype-based object orientation
- First-class functions
- Dynamic typing

**Hello World Example:**
\`\`\`javascript
console.log("Hello, World!");
\`\`\`
        `
      },
      basics: {
        title: "Basic Syntax",
        content: `
**Variables:**
\`\`\`javascript
// ES6 variable declarations
let name = "John";
const PI = 3.14159;
var oldWay = "deprecated";

// Data Types
let string = "Hello";
let number = 42;
let boolean = true;
let array = [1, 2, 3];
let object = { key: "value" };
let nullValue = null;
let undefinedValue;
\`\`\`

**Operators:**
\`\`\`javascript
// Arithmetic
let sum = 5 + 3;
let product = 4 * 2;

// Comparison
let isEqual = 5 === "5"; // false
let isLooseEqual = 5 == "5"; // true

// Logical
let and = true && false;
let or = true || false;
\`\`\`
        `
      },
      functions: {
        title: "Functions",
        content: `
**Function Declarations:**
\`\`\`javascript
// Function declaration
function greet(name) {
  return "Hello, " + name;
}

// Function expression
const square = function(x) {
  return x * x;
};

// Arrow functions (ES6)
const multiply = (a, b) => a * b;

// Default parameters
function createUser(name, age = 18) {
  return { name, age };
}
\`\`\`

**Higher-Order Functions:**
\`\`\`javascript
// Functions that take other functions as arguments
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
const even = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((acc, num) => acc + num, 0);
\`\`\`
        `
      },
      objects: {
        title: "Objects and Classes",
        content: `
**Object Literals:**
\`\`\`javascript
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  
  // Method
  getFullName() {
    return this.firstName + " " + this.lastName;
  }
};
\`\`\`

**Classes (ES6):**
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return \`Hello, my name is \${this.name}\`;
  }
  
  // Static method
  static species() {
    return "Homo sapiens";
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }
}
\`\`\`
        `
      },
      async: {
        title: "Async Programming",
        content: `
**Callbacks:**
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
\`\`\`

**Promises:**
\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Success!");
  }, 1000);
});

promise
  .then(result => console.log(result))
  .catch(error => console.error(error));
\`\`\`

**Async/Await:**
\`\`\`javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`
        `
      },
      dom: {
        title: "DOM Manipulation",
        content: `
**Selecting Elements:**
\`\`\`javascript
// Single element
const header = document.getElementById('header');
const firstPara = document.querySelector('.content p');

// Multiple elements
const allButtons = document.querySelectorAll('button');
const listItems = document.getElementsByClassName('item');
\`\`\`

**Modifying Elements:**
\`\`\`javascript
// Changing content
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";

// Changing styles
element.style.color = "red";
element.classList.add('active');
element.classList.remove('hidden');

// Event handling
button.addEventListener('click', function(event) {
  console.log('Button clicked!');
});
\`\`\`
        `
      },
      es6: {
        title: "ES6+ Features",
        content: `
**Destructuring:**
\`\`\`javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
const { name, age, ...details } = user;

// Function parameters
function createUser({ name, age, email = "default@email.com" }) {
  return { name, age, email };
}
\`\`\`

**Template Literals:**
\`\`\`javascript
const name = "John";
const greeting = \`Hello, \${name}!
Welcome to our application.\`;

// Tagged templates
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => 
    \`\${result}\${string}<mark>\${values[i] || ''}</mark>\`, '');
}
\`\`\`

**Modules:**
\`\`\`javascript
// Exporting
export const PI = 3.14159;
export function calculateArea(radius) {
  return PI * radius * radius;
}
export default class Circle { ... }

// Importing
import Circle, { PI, calculateArea } from './math.js';
\`\`\`
        `
      }
    },
    python: {
      introduction: {
        title: "Introduction to Python",
        content: `
Python is a high-level, interpreted programming language known for its simplicity and readability.

**Key Features:**
- Easy to learn and read
- Extensive standard library
- Cross-platform compatibility
- Object-oriented and functional programming
- Dynamic typing

**Hello World Example:**
\`\`\`python
print("Hello, World!")
\`\`\`
        `
      },
      basics: {
        title: "Basic Syntax",
        content: `
**Variables and Data Types:**
\`\`\`python
# Variables
name = "John"
age = 25
height = 5.11
is_student = True

# Data Structures
fruits = ["apple", "banana", "orange"]
person = {"name": "John", "age": 25}
coordinates = (10, 20)
unique_numbers = {1, 2, 3}
\`\`\`

**Operators:**
\`\`\`python
# Arithmetic
result = 10 + 5
power = 2 ** 3  # 8

# Comparison
is_equal = 5 == 5
is_greater = 10 > 5

# Logical
both_true = True and False
either_true = True or False
\`\`\`
        `
      },
      functions: {
        title: "Functions",
        content: `
**Function Definitions:**
\`\`\`python
def greet(name):
    return f"Hello, {name}"

# Default parameters
def create_user(name, age=18):
    return {"name": name, "age": age}

# Lambda functions
square = lambda x: x * x

# *args and **kwargs
def flexible_function(*args, **kwargs):
    print(f"Args: {args}")
    print(f"Keyword args: {kwargs}")
\`\`\`

**Function Examples:**
\`\`\`python
# Generator function
def count_up_to(max):
    count = 1
    while count <= max:
        yield count
        count += 1

# Decorator
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper
\`\`\`
        `
      },
      oop: {
        title: "Object-Oriented Programming",
        content: `
**Classes and Objects:**
\`\`\`python
class Person:
    species = "Homo sapiens"  # Class attribute
    
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name}"
    
    @classmethod
    def get_species(cls):
        return cls.species
    
    @staticmethod
    def is_adult(age):
        return age >= 18

class Student(Person):
    def __init__(self, name, age, grade):
        super().__init__(name, age)
        self.grade = grade
\`\`\`

**Special Methods:**
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"
\`\`\`
        `
      },
      modules: {
        title: "Modules and Packages",
        content: `
**Importing Modules:**
\`\`\`python
# Standard library imports
import math
import os
from datetime import datetime

# Third-party imports
import requests
from flask import Flask

# Local imports
from my_module import my_function

# Creating modules
# Save as mymodule.py
"""
This is a demo module
"""
def calculate_area(radius):
    return math.pi * radius ** 2

class Calculator:
    def add(self, a, b):
        return a + b
\`\`\`

**Virtual Environments:**
\`\`\`bash
# Create virtual environment
python -m venv myenv

# Activate (Windows)
myenv\\Scripts\\activate

# Activate (Unix/MacOS)
source myenv/bin/activate

# Install packages
pip install requests flask numpy
\`\`\`
        `
      },
      fileio: {
        title: "File I/O and Exception Handling",
        content: `
**File Operations:**
\`\`\`python
# Reading files
with open('file.txt', 'r') as file:
    content = file.read()
    lines = file.readlines()

# Writing files
with open('output.txt', 'w') as file:
    file.write("Hello, World!")

# JSON operations
import json
data = {"name": "John", "age": 30}
with open('data.json', 'w') as file:
    json.dump(data, file)
\`\`\`

**Exception Handling:**
\`\`\`python
try:
    result = 10 / 0
    with open('nonexistent.txt', 'r') as file:
        content = file.read()
except ZeroDivisionError:
    print("Cannot divide by zero!")
except FileNotFoundError:
    print("File not found!")
except Exception as e:
    print(f"An error occurred: {e}")
else:
    print("No errors occurred!")
finally:
    print("This always executes")
\`\`\`
        `
      },
      libraries: {
        title: "Popular Libraries",
        content: `
**Data Science Stack:**
\`\`\`python
# NumPy for numerical computing
import numpy as np
array = np.array([1, 2, 3, 4, 5])
matrix = np.random.rand(3, 3)

# Pandas for data manipulation
import pandas as pd
df = pd.DataFrame({
    'Name': ['John', 'Jane', 'Bob'],
    'Age': [25, 30, 35]
})

# Matplotlib for plotting
import matplotlib.pyplot as plt
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.show()
\`\`\`

**Web Development:**
\`\`\`python
# Flask web framework
from flask import Flask
app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, World!"

if __name__ == '__main__':
    app.run(debug=True)

# Requests for HTTP
import requests
response = requests.get('https://api.github.com')
data = response.json()
\`\`\`
        `
      }
    },
    java: {
      introduction: {
        title: "Introduction to Java",
        content: `
Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible.

**Key Features:**
- Platform independence (Write Once, Run Anywhere)
- Object-oriented
- Strongly typed
- Automatic memory management (Garbage Collection)
- Multi-threading support

**Hello World Example:**
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`
        `
      },
      basics: {
        title: "Basic Syntax",
        content: `
**Variables and Data Types:**
\`\`\`java
// Primitive data types
int age = 25;
double salary = 50000.0;
char grade = 'A';
boolean isActive = true;

// Reference types
String name = "John Doe";
int[] numbers = {1, 2, 3, 4, 5};
\`\`\`

**Operators:**
\`\`\`java
// Arithmetic
int sum = 5 + 3;
int product = 4 * 2;

// Comparison
boolean isEqual = 5 == 5;
boolean isGreater = 10 > 5;

// Logical
boolean and = true && false;
boolean or = true || false;
\`\`\`
        `
      },
      oop: {
        title: "Object-Oriented Programming",
        content: `
**Classes and Objects:**
\`\`\`java
public class Person {
    // Fields
    private String name;
    private int age;
    
    // Constructor
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public void greet() {
        System.out.println("Hello, my name is " + name);
    }
}

// Inheritance
public class Student extends Person {
    private String grade;
    
    public Student(String name, int age, String grade) {
        super(name, age);
        this.grade = grade;
    }
}
\`\`\`

**Interfaces and Abstract Classes:**
\`\`\`java
// Interface
interface Drawable {
    void draw();
    double getArea();
}

// Abstract class
abstract class Shape implements Drawable {
    protected String color;
    
    public Shape(String color) {
        this.color = color;
    }
}
\`\`\`
        `
      },
      collections: {
        title: "Collections Framework",
        content: `
**List, Set, and Map:**
\`\`\`java
import java.util.*;

// List
List<String> names = new ArrayList<>();
names.add("John");
names.add("Jane");

// Set
Set<Integer> uniqueNumbers = new HashSet<>();
uniqueNumbers.add(1);
uniqueNumbers.add(2);

// Map
Map<String, Integer> ages = new HashMap<>();
ages.put("John", 25);
ages.put("Jane", 30);

// Iterating through collections
for (String name : names) {
    System.out.println(name);
}

for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
\`\`\`
        `
      },
      exceptions: {
        title: "Exception Handling",
        content: `
**Try-Catch Blocks:**
\`\`\`java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = divide(10, 0);
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero: " + e.getMessage());
        } finally {
            System.out.println("This always executes");
        }
    }
    
    public static int divide(int a, int b) {
        if (b == 0) {
            throw new ArithmeticException("Division by zero");
        }
        return a / b;
    }
}
\`\`\`

**Custom Exceptions:**
\`\`\`java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

class BankAccount {
    private double balance;
    
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds");
        }
        balance -= amount;
    }
}
\`\`\`
        `
      },
      multithreading: {
        title: "Multithreading",
        content: `
**Creating Threads:**
\`\`\`java
// Extending Thread class
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread is running");
    }
}

// Implementing Runnable interface
class MyRunnable implements Runnable {
    public void run() {
        System.out.println("Runnable is running");
    }
}

// Usage
public class ThreadExample {
    public static void main(String[] args) {
        // Method 1
        MyThread thread1 = new MyThread();
        thread1.start();
        
        // Method 2
        Thread thread2 = new Thread(new MyRunnable());
        thread2.start();
        
        // Method 3: Lambda expression
        Thread thread3 = new Thread(() -> {
            System.out.println("Lambda thread running");
        });
        thread3.start();
    }
}
\`\`\`

**Synchronization:**
\`\`\`java
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
}
\`\`\`
        `
      }
    },
    cpp: {
      introduction: {
        title: "Introduction to C++",
        content: `
C++ is a general-purpose programming language created as an extension of the C programming language.

**Key Features:**
- Object-oriented programming
- System programming capabilities
- Template metaprogramming
- Memory management control
- High performance

**Hello World Example:**
\`\`\`cpp
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}
\`\`\`
        `
      },
      basics: {
        title: "Basic Syntax",
        content: `
**Variables and Data Types:**
\`\`\`cpp
// Fundamental data types
int age = 25;
double price = 99.99;
char grade = 'A';
bool isActive = true;

// Pointers and references
int number = 42;
int* ptr = &number;
int& ref = number;

// Arrays
int numbers[5] = {1, 2, 3, 4, 5};
\`\`\`

**Operators:**
\`\`\`cpp
// Arithmetic
int sum = 5 + 3;
int product = 4 * 2;

// Comparison
bool isEqual = 5 == 5;
bool isGreater = 10 > 5;

// Logical
bool andResult = true && false;
bool orResult = true || false;
\`\`\`
        `
      },
      oop: {
        title: "Object-Oriented Programming",
        content: `
**Classes and Objects:**
\`\`\`cpp
class Person {
private:
    std::string name;
    int age;

public:
    // Constructor
    Person(std::string name, int age) : name(name), age(age) {}
    
    // Methods
    std::string getName() const {
        return name;
    }
    
    void setName(const std::string& newName) {
        name = newName;
    }
    
    void introduce() {
        std::cout << "Hello, I'm " << name << std::endl;
    }
};

// Inheritance
class Student : public Person {
private:
    std::string major;
    
public:
    Student(std::string name, int age, std::string major) 
        : Person(name, age), major(major) {}
};
\`\`\`

**Polymorphism:**
\`\`\`cpp
class Animal {
public:
    virtual void makeSound() {
        std::cout << "Some animal sound" << std::endl;
    }
};

class Dog : public Animal {
public:
    void makeSound() override {
        std::cout << "Woof!" << std::endl;
    }
};

class Cat : public Animal {
public:
    void makeSound() override {
        std::cout << "Meow!" << std::endl;
    }
};
\`\`\`
        `
      },
      stl: {
        title: "Standard Template Library",
        content: `
**Containers and Algorithms:**
\`\`\`cpp
#include <vector>
#include <algorithm>
#include <map>
#include <iostream>

void stlExamples() {
    // Vector
    std::vector<int> numbers = {5, 2, 8, 1, 9};
    
    // Sorting
    std::sort(numbers.begin(), numbers.end());
    
    // Map
    std::map<std::string, int> ages;
    ages["John"] = 25;
    ages["Jane"] = 30;
    
    // Iterating
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    for (const auto& pair : ages) {
        std::cout << pair.first << ": " << pair.second << std::endl;
    }
}
\`\`\`

**Smart Pointers:**
\`\`\`cpp
#include <memory>

class Resource {
public:
    Resource() { std::cout << "Resource acquired\n"; }
    ~Resource() { std::cout << "Resource destroyed\n"; }
    void use() { std::cout << "Using resource\n"; }
};

void smartPointerDemo() {
    // Unique pointer
    std::unique_ptr<Resource> res1 = std::make_unique<Resource>();
    
    // Shared pointer
    std::shared_ptr<Resource> res2 = std::make_shared<Resource>();
    std::shared_ptr<Resource> res3 = res2; // Shared ownership
}
\`\`\`
        `
      },
      templates: {
        title: "Templates",
        content: `
**Function Templates:**
\`\`\`cpp
template<typename T>
T max(T a, T b) {
    return (a > b) ? a : b;
}

// Usage
int main() {
    int intMax = max(5, 10);
    double doubleMax = max(3.14, 2.71);
    std::cout << "Max int: " << intMax << std::endl;
    std::cout << "Max double: " << doubleMax << std::endl;
    return 0;
}
\`\`\`

**Class Templates:**
\`\`\`cpp
template<typename T>
class Box {
private:
    T content;
    
public:
    Box(T content) : content(content) {}
    
    T getContent() const {
        return content;
    }
    
    void setContent(T newContent) {
        content = newContent;
    }
};

// Usage
Box<int> intBox(42);
Box<std::string> stringBox("Hello");
\`\`\`
        `
      },
      memory: {
        title: "Memory Management",
        content: `
**Dynamic Memory Allocation:**
\`\`\`cpp
#include <iostream>

void memoryManagement() {
    // Dynamic allocation
    int* numbers = new int[10];
    
    // Use the array
    for (int i = 0; i < 10; i++) {
        numbers[i] = i * i;
    }
    
    // Don't forget to delete!
    delete[] numbers;
    
    // Better: use smart pointers
    std::unique_ptr<int[]> smartNumbers = std::make_unique<int[]>(10);
    // Automatically deleted when out of scope
}

**RAII (Resource Acquisition Is Initialization):**
\`\`\`cpp
class FileHandler {
private:
    FILE* file;
    
public:
    FileHandler(const char* filename, const char* mode) {
        file = fopen(filename, mode);
        if (!file) {
            throw std::runtime_error("Failed to open file");
        }
    }
    
    ~FileHandler() {
        if (file) {
            fclose(file);
        }
    }
    
    // Prevent copying
    FileHandler(const FileHandler&) = delete;
    FileHandler& operator=(const FileHandler&) = delete;
};
\`\`\`
        `
      }
    },
    c: {
      introduction: {
        title: "Introduction to C",
        content: `
C is a general-purpose, procedural programming language supporting structured programming.

**Key Features:**
- Procedural language
- Low-level memory access
- Simple and efficient
- Portable
- Minimal runtime

**Hello World Example:**
\`\`\`c
#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}
\`\`\`
        `
      },
      basics: {
        title: "Basic Syntax",
        content: `
**Variables and Data Types:**
\`\`\`c
// Basic data types
int age = 25;
float price = 99.99;
double precise = 3.1415926535;
char grade = 'A';

// Arrays
int numbers[5] = {1, 2, 3, 4, 5};
char name[] = "John";

// Pointers
int number = 42;
int* ptr = &number;
\`\`\`

**Operators:**
\`\`\`c
// Arithmetic
int sum = 5 + 3;
int product = 4 * 2;

// Comparison
int isEqual = 5 == 5;
int isGreater = 10 > 5;

// Logical
int and = 1 && 0;  // true && false
int or = 1 || 0;   // true || false
\`\`\`
        `
      },
      functions: {
        title: "Functions",
        content: `
**Function Declaration and Definition:**
\`\`\`c
#include <stdio.h>

// Function declaration
int add(int a, int b);
void printMessage(char message[]);

// Function definition
int add(int a, int b) {
    return a + b;
}

void printMessage(char message[]) {
    printf("Message: %s\\n", message);
}

int main() {
    int result = add(5, 3);
    printMessage("Hello from function!");
    printf("Result: %d\\n", result);
    return 0;
}
\`\`\`

**Recursive Functions:**
\`\`\`c
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}
\`\`\`
        `
      },
      pointers: {
        title: "Pointers and Memory",
        content: `
**Pointer Basics:**
\`\`\`c
#include <stdio.h>

void pointerExamples() {
    int number = 42;
    int* ptr = &number;
    
    printf("Value: %d\\n", number);
    printf("Address: %p\\n", (void*)ptr);
    printf("Value via pointer: %d\\n", *ptr);
    
    // Pointer arithmetic
    int arr[5] = {10, 20, 30, 40, 50};
    int* arrPtr = arr;
    
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\\n", i, *(arrPtr + i));
    }
}
\`\`\`

**Dynamic Memory Allocation:**
\`\`\`c
#include <stdio.h>
#include <stdlib.h>

void dynamicMemory() {
    // Allocate memory for an integer
    int* number = (int*)malloc(sizeof(int));
    *number = 100;
    printf("Number: %d\\n", *number);
    free(number);  // Always free allocated memory
    
    // Allocate memory for an array
    int* arr = (int*)malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) {
        arr[i] = i * 10;
    }
    
    // Reallocate memory
    arr = (int*)realloc(arr, 10 * sizeof(int));
    
    free(arr);  // Free the array
}
\`\`\`
        `
      },
      structures: {
        title: "Structures and Unions",
        content: `
**Structures:**
\`\`\`c
#include <stdio.h>
#include <string.h>

// Structure definition
struct Person {
    char name[50];
    int age;
    float height;
};

void structureExamples() {
    // Structure variable
    struct Person person1;
    
    // Assign values
    strcpy(person1.name, "John Doe");
    person1.age = 25;
    person1.height = 5.9;
    
    // Alternative initialization
    struct Person person2 = {"Jane Smith", 30, 5.6};
    
    printf("Name: %s, Age: %d, Height: %.1f\\n", 
           person1.name, person1.age, person1.height);
}

// Typedef with structures
typedef struct {
    int x;
    int y;
} Point;
\`\`\`

**Unions:**
\`\`\`c
union Data {
    int i;
    float f;
    char str[20];
};

void unionExample() {
    union Data data;
    
    data.i = 10;
    printf("data.i = %d\\n", data.i);
    
    data.f = 220.5;
    printf("data.f = %.2f\\n", data.f);
    
    strcpy(data.str, "C Programming");
    printf("data.str = %s\\n", data.str);
}
\`\`\`
        `
      },
      fileio: {
        title: "File I/O",
        content: `
**File Operations:**
\`\`\`c
#include <stdio.h>

void fileOperations() {
    FILE *file;
    char buffer[100];
    
    // Writing to a file
    file = fopen("example.txt", "w");
    if (file == NULL) {
        printf("Error opening file for writing!\\n");
        return;
    }
    fprintf(file, "Hello, File!\\n");
    fprintf(file, "This is a C file operation example.\\n");
    fclose(file);
    
    // Reading from a file
    file = fopen("example.txt", "r");
    if (file == NULL) {
        printf("Error opening file for reading!\\n");
        return;
    }
    
    printf("File contents:\\n");
    while (fgets(buffer, sizeof(buffer), file) != NULL) {
        printf("%s", buffer);
    }
    fclose(file);
}
\`\`\`

**Binary File Operations:**
\`\`\`c
struct Student {
    int id;
    char name[50];
    float grade;
};

void binaryFileExample() {
    struct Student student = {1, "Alice", 85.5};
    FILE *file;
    
    // Write binary
    file = fopen("students.dat", "wb");
    fwrite(&student, sizeof(struct Student), 1, file);
    fclose(file);
    
    // Read binary
    struct Student readStudent;
    file = fopen("students.dat", "rb");
    fread(&readStudent, sizeof(struct Student), 1, file);
    fclose(file);
    
    printf("ID: %d, Name: %s, Grade: %.1f\\n", 
           readStudent.id, readStudent.name, readStudent.grade);
}
\`\`\`
        `
      }
    }
  };

  const languages = [
    { id: 'javascript', name: 'JavaScript', color: 'bg-yellow-500' },
    { id: 'python', name: 'Python', color: 'bg-blue-500' },
    { id: 'java', name: 'Java', color: 'bg-red-500' },
    { id: 'cpp', name: 'C++', color: 'bg-purple-500' },
    { id: 'c', name: 'C', color: 'bg-gray-500' }
  ];

  const getTopics = (lang) => {
    const topics = {
      javascript: ['introduction', 'basics', 'functions', 'objects', 'async', 'dom', 'es6'],
      python: ['introduction', 'basics', 'functions', 'oop', 'modules', 'fileio', 'libraries'],
      java: ['introduction', 'basics', 'oop', 'collections', 'exceptions', 'multithreading'],
      cpp: ['introduction', 'basics', 'oop', 'stl', 'templates', 'memory'],
      c: ['introduction', 'basics', 'functions', 'pointers', 'structures', 'fileio']
    };
    return topics[lang] || [];
  };

  const renderContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={index} className="font-bold text-lg mt-4 mb-2 text-gray-200">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line.trim().startsWith('```')) {
        return null;
      }
      if (line.includes('```')) {
        return null;
      }
      return <p key={index} className="mb-2 leading-relaxed text-gray-300">{line}</p>;
    });
  };

  const renderCodeBlocks = (content) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text-${lastIndex}`} className="mb-4">
            {renderContent(content.slice(lastIndex, match.index))}
          </div>
        );
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2].trim();
      parts.push(
        <div key={`code-${match.index}`} className="mb-6">
          <div className="flex justify-between items-center bg-gray-800 px-4 py-2 rounded-t-lg border border-gray-700">
            <span className="text-gray-300 text-sm font-mono">{language}</span>
            <button 
              onClick={() => navigator.clipboard.writeText(code)}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              Copy
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto text-sm border border-gray-700 border-t-0 font-mono">
            <code>{code}</code>
          </pre>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <div key={`text-${lastIndex}`} className="mb-4">
          {renderContent(content.slice(lastIndex))}
        </div>
      );
    }

    return parts;
  };

  const currentTopic = documentationData[selectedLanguage]?.[activeTopic];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-gray-800 border-r border-gray-700 transition-all duration-300 overflow-hidden flex flex-col`}>
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-gray-200">Learn Programming</h1>
          <p className="text-gray-400 mt-2">Comprehensive documentation and tutorials</p>
        </div>

        {/* Language Selection */}
        <div className="p-4 border-b border-gray-700">
          <label className="block text-sm font-medium text-gray-400 mb-2">Select Language</label>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  setSelectedLanguage(lang.id);
                  setActiveTopic('introduction');
                }}
                className={`flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  selectedLanguage === lang.id
                    ? `${lang.color} text-white`
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-700">
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-4">
            <h3 className="text-lg font-semibold text-gray-300 mb-3">Topics</h3>
            <ul className="space-y-1">
              {getTopics(selectedLanguage).map((topic) => (
                <li key={topic}>
                  <button
                    onClick={() => setActiveTopic(topic)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      activeTopic === topic
                        ? 'bg-blue-600 text-white border border-blue-500'
                        : 'text-gray-400 hover:bg-gray-700 hover:text-gray-200'
                    }`}
                  >
                    {documentationData[selectedLanguage]?.[topic]?.title || topic}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold text-gray-200">
                {currentTopic?.title || 'Documentation'}
              </h2>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedLanguage === 'javascript' 
                  ? 'bg-yellow-500 text-gray-900' 
                  : selectedLanguage === 'python'
                  ? 'bg-blue-500 text-white'
                  : selectedLanguage === 'java'
                  ? 'bg-red-500 text-white'
                  : selectedLanguage === 'cpp'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}>
                {languages.find(l => l.id === selectedLanguage)?.name}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-900">
          <div className="max-w-4xl mx-auto py-8 px-6">
            {currentTopic ? (
              <article className="max-w-none">
                <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 mb-8 border border-gray-700">
                  <h1 className="text-3xl font-bold text-gray-200 mb-4">
                    {currentTopic.title}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    {selectedLanguage === 'javascript' 
                      ? 'Learn modern JavaScript programming' 
                      : selectedLanguage === 'python'
                      ? 'Master Python programming concepts'
                      : selectedLanguage === 'java'
                      ? 'Learn Java enterprise development'
                      : selectedLanguage === 'cpp'
                      ? 'Master C++ system programming'
                      : 'Learn C programming fundamentals'}
                  </p>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  {renderCodeBlocks(currentTopic.content)}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-12 pt-6 border-t border-gray-700">
                  <button 
                    onClick={() => {
                      const topics = getTopics(selectedLanguage);
                      const currentIndex = topics.indexOf(activeTopic);
                      if (currentIndex > 0) {
                        setActiveTopic(topics[currentIndex - 1]);
                      }
                    }}
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors border border-gray-600"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>
                  <button 
                    onClick={() => {
                      const topics = getTopics(selectedLanguage);
                      const currentIndex = topics.indexOf(activeTopic);
                      if (currentIndex < topics.length - 1) {
                        setActiveTopic(topics[currentIndex + 1]);
                      }
                    }}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </article>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No topic selected</h3>
                <p className="text-gray-500">Please select a topic from the sidebar to get started.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Learn;