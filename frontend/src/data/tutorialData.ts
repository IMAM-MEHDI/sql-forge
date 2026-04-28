export interface TutorialTopic {
  id: string;
  title: string;
  category: string;
  explanation: string;
  example: string;
  codeBreakdown?: string;
  practiceQuery?: string;
  gameLevelId?: string;
  gameLevelTitle?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Hard';
}

export const tutorialData: Record<string, TutorialTopic> = {
  // SQL Tutorial
  'sql-home': {
    id: 'sql-home',
    title: 'SQL HOME',
    category: 'SQL Tutorial',
    explanation: 'SQL is a standard language for storing, manipulating and retrieving data in databases. Our SQL tutorial will teach you how to use SQL in: MySQL, SQL Server, MS Access, Oracle, Sybase, Informix, Postgres, and other database systems.',
    example: 'SELECT * FROM Customers;',
    codeBreakdown: '• SELECT: A keyword that tells the database we want to retrieve data.\n• *: A wildcard that means "all columns".\n• FROM Customers: Specifies the table where the data is stored.',
    practiceQuery: 'SELECT * FROM levels;',
    difficulty: 'Beginner'
  },
  'select-all': {
    id: 'select-all',
    title: 'SQL SELECT ALL',
    category: 'SQL Tutorial',
    explanation: 'The SELECT statement is used to select data from a database. If you want to select all columns available in the table, use the asterisk (*) symbol.',
    example: 'SELECT * FROM employees;',
    codeBreakdown: '• SELECT: Starts the data retrieval process.\n• *: Tells SQL to return every single column in the table.\n• FROM employees: Points the query to our specific "employees" dataset.',
    practiceQuery: 'SELECT * FROM levels;',
    gameLevelId: '5e8b6dca-2c68-4269-98f6-8776daf1c290',
    gameLevelTitle: 'Level 1: Employee Retrieval',
    difficulty: 'Beginner'
  },
  'select-column': {
    id: 'select-column',
    title: 'SQL SELECT Column',
    category: 'SQL Tutorial',
    explanation: 'The SELECT statement is also used to select specific columns from a database table. This is more efficient than selecting all columns if you only need certain data.',
    example: 'SELECT name, department FROM employees;',
    codeBreakdown: '• SELECT: Initiates the query.\n• name, department: Lists the specific column names we want to see, separated by a comma.\n• FROM employees: The source table.',
    practiceQuery: 'SELECT title, difficulty FROM levels;',
    difficulty: 'Beginner'
  },
  'sql-intro': {
    id: 'sql-intro',
    title: 'SQL Intro',
    category: 'SQL Tutorial',
    explanation: 'SQL stands for Structured Query Language. SQL lets you access and manipulate databases. SQL became a standard of the American National Standards Institute (ANSI) in 1986, and of the International Organization for Standardization (ISO) in 1987.',
    example: '-- SQL is the standard language for relational database management systems.',
    practiceQuery: 'SELECT 1;',
    difficulty: 'Beginner'
  },
  'sql-syntax': {
    id: 'sql-syntax',
    title: 'SQL Syntax',
    category: 'SQL Tutorial',
    explanation: 'A database most often contains one or more tables. Each table is identified by a name (e.g. "Customers" or "Orders"). Tables contain records (rows) with data. SQL statements are not case sensitive (SELECT is the same as select), but it is common practice to write keywords in uppercase.',
    example: 'SELECT * FROM Customers;\n-- Semicolon is the standard way to separate each SQL statement.',
    practiceQuery: 'SELECT * FROM users;',
    difficulty: 'Beginner'
  },
  'select': {
    id: 'select',
    title: 'SQL Select',
    category: 'SQL Tutorial',
    explanation: 'The SELECT statement is used to select data from a database. The data returned is stored in a result table, called the result-set.',
    example: 'SELECT CustomerName, City FROM Customers;',
    practiceQuery: 'SELECT title, difficulty FROM levels;',
    gameLevelId: '5e8b6dca-2c68-4269-98f6-8776daf1c290',
    gameLevelTitle: 'Level 1: Employee Retrieval',
    difficulty: 'Beginner'
  },
  'select-distinct': {
    id: 'select-distinct',
    title: 'SQL SELECT DISTINCT',
    category: 'SQL Tutorial',
    explanation: 'The SELECT DISTINCT statement is used to return only distinct (different) values.',
    example: 'SELECT DISTINCT Country FROM Customers;',
    codeBreakdown: '• SELECT DISTINCT: Ensures that duplicate results are filtered out, returning only unique values.\n• Country: The column we are inspecting for uniqueness.\n• FROM Customers: The table source.',
    practiceQuery: 'SELECT DISTINCT category FROM levels;',
    difficulty: 'Intermediate'
  },
  'sql-where': {
    id: 'sql-where',
    title: 'SQL WHERE Clause',
    category: 'SQL Tutorial',
    explanation: 'The WHERE clause is used to filter records. It is used to extract only those records that fulfill a specified condition.',
    example: 'SELECT * FROM Customers WHERE Country=\'Mexico\';',
    codeBreakdown: '• SELECT *: Select all columns.\n• FROM Customers: Source table.\n• WHERE: The filter keyword.\n• Country=\'Mexico\': The specific condition. Note that text values are wrapped in single quotes.',
    practiceQuery: 'SELECT * FROM levels WHERE difficulty = \'Easy\';',
    gameLevelId: 'e2d31b8a-7561-4b5c-a348-fd8c71113a42',
    gameLevelTitle: 'Level 2: Filtering Departments',
    difficulty: 'Beginner'
  },
  'sql-and-or-not': {
    id: 'sql-and-or-not',
    title: 'SQL AND, OR, NOT',
    category: 'SQL Tutorial',
    explanation: 'The WHERE clause can be combined with AND, OR, and NOT operators. The AND and OR operators are used to filter records based on more than one condition.',
    example: 'SELECT * FROM Customers WHERE Country=\'Germany\' AND City=\'Berlin\';',
    codeBreakdown: '• AND: Requires BOTH conditions to be true.\n• OR: Requires at least one condition to be true.\n• NOT: Returns records where the condition is FALSE.',
    practiceQuery: 'SELECT * FROM levels WHERE difficulty = \'Easy\' AND category = \'SQL Tutorial\';',
    difficulty: 'Intermediate'
  },
  'sql-order-by': {
    id: 'sql-order-by',
    title: 'SQL ORDER BY',
    category: 'SQL Tutorial',
    explanation: 'The ORDER BY keyword is used to sort the result-set in ascending or descending order. The ORDER BY keyword sorts the records in ascending order by default. To sort the records in descending order, use the DESC keyword.',
    example: 'SELECT * FROM Customers ORDER BY Country DESC;',
    codeBreakdown: '• ORDER BY: Tells SQL to sort the final list.\n• Country: The column to sort by.\n• DESC: Short for "Descending" (Z-A or Largest-Smallest). By default, it uses ASC.',
    practiceQuery: 'SELECT * FROM levels ORDER BY id DESC;',
    gameLevelId: '39295fc1-98e7-40cd-8224-58c6a61dd796',
    gameLevelTitle: 'Level 3: Salary Sorting',
    difficulty: 'Beginner'
  },
  'sql-insert': {
    id: 'sql-insert',
    title: 'SQL INSERT INTO',
    category: 'SQL Tutorial',
    explanation: 'The INSERT INTO statement is used to insert new records in a table.',
    example: 'INSERT INTO Customers (CustomerName, City, Country) VALUES (\'Cardinal\', \'Stavanger\', \'Norway\');',
    codeBreakdown: '• INSERT INTO: The command for adding data.\n• (Col1, Col2...): Lists the columns we are filling.\n• VALUES (...): Lists the corresponding data for those columns.',
    practiceQuery: 'SELECT * FROM users;',
    difficulty: 'Beginner'
  },
  'sql-update': {
    id: 'sql-update',
    title: 'SQL UPDATE',
    category: 'SQL Tutorial',
    explanation: 'The UPDATE statement is used to modify the existing records in a table.',
    example: 'UPDATE Customers SET ContactName = \'Alfred Schmidt\', City= \'Frankfurt\' WHERE CustomerID = 1;',
    codeBreakdown: '• UPDATE: Command to edit existing rows.\n• SET: Specifies which columns to change and their new values.\n• WHERE: CRITICAL. Without this, EVERY row in the table will be updated!',
    practiceQuery: 'SELECT * FROM levels;',
    difficulty: 'Intermediate'
  },
  'sql-delete': {
    id: 'sql-delete',
    title: 'SQL DELETE',
    category: 'SQL Tutorial',
    explanation: 'The DELETE statement is used to delete existing records in a table.',
    example: 'DELETE FROM Customers WHERE CustomerName=\'Alfreds Futterkiste\';',
    codeBreakdown: '• DELETE FROM: Removes rows entirely.\n• WHERE: Specifies which rows to destroy. Be careful!',
    practiceQuery: 'SELECT * FROM levels;',
    difficulty: 'Intermediate'
  },
  'sql-null': {
    id: 'sql-null',
    title: 'SQL Null Values',
    category: 'SQL Tutorial',
    explanation: 'A field with a NULL value is a field with no value. It is very important to understand that a NULL value is different from a zero value or a field that contains spaces. A field with a NULL value is one that has been left blank during record creation!',
    example: 'SELECT CustomerName, ContactName, Address FROM Customers WHERE Address IS NULL;',
    practiceQuery: 'SELECT * FROM levels WHERE description IS NOT NULL;',
    difficulty: 'Beginner'
  },
  'update': {
    id: 'update',
    title: 'SQL Update',
    category: 'SQL Tutorial',
    explanation: 'The UPDATE statement is used to modify the existing records in a table.',
    example: 'UPDATE Customers SET ContactName = \'Alfred Schmidt\', City= \'Frankfurt\' WHERE CustomerID = 1;',
    practiceQuery: 'UPDATE users SET bio = \'SQL Master\' WHERE id = 1;',
    difficulty: 'Intermediate'
  },
  'delete': {
    id: 'delete',
    title: 'SQL Delete',
    category: 'SQL Tutorial',
    explanation: 'The DELETE statement is used to delete existing records in a table.',
    example: 'DELETE FROM Customers WHERE CustomerName=\'Alfreds Futterkiste\';',
    practiceQuery: 'DELETE FROM submissions WHERE status = \'Failed\';',
    difficulty: 'Intermediate'
  },
  'select-top': {
    id: 'select-top',
    title: 'SQL Select Top',
    category: 'SQL Tutorial',
    explanation: 'The SELECT TOP clause is used to specify the number of records to return. The SELECT TOP clause is useful on large tables with thousands of records. Returning a large number of records can impact performance. (Note: PostgreSQL uses LIMIT instead of TOP).',
    example: 'SELECT TOP 3 * FROM Customers; -- SQL Server\nSELECT * FROM Customers LIMIT 3; -- PostgreSQL',
    practiceQuery: 'SELECT * FROM levels LIMIT 5;',
    difficulty: 'Beginner'
  },
  'aggregate-functions': {
    id: 'aggregate-functions',
    title: 'SQL Aggregate Functions',
    category: 'SQL Tutorial',
    explanation: 'An aggregate function performs a calculation on a set of values, and returns a single value. Aggregate functions are often used with the GROUP BY clause of the SELECT statement.',
    example: 'SELECT COUNT(CustomerID), Country FROM Customers GROUP BY Country;',
    practiceQuery: 'SELECT COUNT(*) FROM levels;',
    difficulty: 'Intermediate'
  },
  'min-max': {
    id: 'min-max',
    title: 'SQL Min() and Max()',
    category: 'SQL Tutorial',
    explanation: 'The MIN() function returns the smallest value of the selected column. The MAX() function returns the largest value of the selected column.',
    example: 'SELECT MIN(Price) FROM Products;\nSELECT MAX(Price) FROM Products;',
    practiceQuery: 'SELECT MAX(id) FROM levels;',
    difficulty: 'Beginner'
  },
  'count-sum-avg': {
    id: 'count-sum-avg',
    title: 'SQL Count, Sum, Avg',
    category: 'SQL Tutorial',
    explanation: 'The COUNT() function returns the number of rows that matches a specified criterion. The SUM() function returns the total sum of a numeric column. The AVG() function returns the average value of a numeric column.',
    example: 'SELECT COUNT(ProductID) FROM Products;\nSELECT SUM(Quantity) FROM OrderDetails;\nSELECT AVG(Price) FROM Products;',
    practiceQuery: 'SELECT AVG(id::int) FROM levels;',
    difficulty: 'Beginner'
  },
  'like': {
    id: 'like',
    title: 'SQL Like',
    category: 'SQL Tutorial',
    explanation: 'The LIKE operator is used in a WHERE clause to search for a specified pattern in a column. There are two wildcards often used in conjunction with the LIKE operator: % (zero, one, or multiple characters) and _ (a single character).',
    example: 'SELECT * FROM Customers WHERE CustomerName LIKE \'a%\';',
    practiceQuery: 'SELECT * FROM levels WHERE title LIKE \'%Level%\';',
    difficulty: 'Beginner'
  },
  'joins': {
    id: 'joins',
    title: 'SQL Joins',
    category: 'SQL Tutorial',
    explanation: 'A JOIN clause is used to combine rows from two or more tables, based on a related column between them.',
    example: 'SELECT Orders.OrderID, Customers.CustomerName FROM Orders\nINNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;',
    practiceQuery: 'SELECT l.title, s.status FROM levels l LEFT JOIN submissions s ON l.id = s.level_id;',
    gameLevelId: 'a522e0fa-c221-4210-9e52-b314477abff9',
    gameLevelTitle: 'Level 6: Joining Teams',
    difficulty: 'Intermediate'
  },
  'inner-join': {
    id: 'inner-join',
    title: 'SQL Inner Join',
    category: 'SQL Tutorial',
    explanation: 'The INNER JOIN keyword selects records that have matching values in both tables.',
    example: 'SELECT column_name(s) FROM table1\nINNER JOIN table2 ON table1.column_name = table2.column_name;',
    practiceQuery: 'SELECT * FROM users INNER JOIN submissions ON users.id = submissions.user_id;',
    difficulty: 'Intermediate'
  },
  'left-join': {
    id: 'left-join',
    title: 'SQL Left Join',
    category: 'SQL Tutorial',
    explanation: 'The LEFT JOIN keyword returns all records from the left table (table1), and the matching records from the right table (table2). The result is 0 records from the right side, if there is no match.',
    example: 'SELECT column_name(s) FROM table1\nLEFT JOIN table2 ON table1.column_name = table2.column_name;',
    practiceQuery: 'SELECT * FROM levels LEFT JOIN submissions ON levels.id = submissions.level_id;',
    difficulty: 'Intermediate'
  },
  'right-join': {
    id: 'right-join',
    title: 'SQL Right Join',
    category: 'SQL Tutorial',
    explanation: 'The RIGHT JOIN keyword returns all records from the right table (table2), and the matching records from the left table (table1). The result is 0 records from the left side, if there is no match.',
    example: 'SELECT column_name(s) FROM table1\nRIGHT JOIN table2 ON table1.column_name = table2.column_name;',
    practiceQuery: 'SELECT * FROM submissions RIGHT JOIN users ON submissions.user_id = users.id;',
    difficulty: 'Intermediate'
  },
  'full-join': {
    id: 'full-join',
    title: 'SQL Full Join',
    category: 'SQL Tutorial',
    explanation: 'The FULL OUTER JOIN keyword returns all records when there is a match in left (table1) or right (table2) table records.',
    example: 'SELECT column_name(s) FROM table1\nFULL OUTER JOIN table2 ON table1.column_name = table2.column_name;',
    practiceQuery: 'SELECT * FROM users FULL JOIN submissions ON users.id = submissions.user_id;',
    difficulty: 'Intermediate'
  },
  'union': {
    id: 'union',
    title: 'SQL Union',
    category: 'SQL Tutorial',
    explanation: 'The UNION operator is used to combine the result-set of two or more SELECT statements. Each SELECT statement within UNION must have the same number of columns.',
    example: 'SELECT City FROM Customers\nUNION\nSELECT City FROM Suppliers;',
    practiceQuery: 'SELECT title FROM levels UNION SELECT username FROM users;',
    difficulty: 'Intermediate'
  },
  'case': {
    id: 'case',
    title: 'SQL Case',
    category: 'SQL Tutorial',
    explanation: 'The CASE statement goes through conditions and returns a value when the first condition is met (like an if-then-else statement). So, once a condition is true, it will stop reading and return the result. If no conditions are true, it returns the value in the ELSE clause.',
    example: 'SELECT CustomerName, City, \nCASE \n    WHEN City = \'Oslo\' THEN \'Local\'\n    ELSE \'International\'\nEND AS CustomerType\nFROM Customers;',
    practiceQuery: 'SELECT title, CASE WHEN difficulty = \'Easy\' THEN 1 ELSE 2 END as rank FROM levels;',
    difficulty: 'Intermediate'
  },

  // SQL Database
  'create-db': {
    id: 'create-db',
    title: 'SQL Create DB',
    category: 'SQL Database',
    explanation: 'The CREATE DATABASE statement is used to create a new SQL database.',
    example: 'CREATE DATABASE testDB;',
    practiceQuery: 'SELECT current_database();',
    difficulty: 'Beginner'
  },
  'drop-db': {
    id: 'drop-db',
    title: 'SQL Drop DB',
    category: 'SQL Database',
    explanation: 'The DROP DATABASE statement is used to drop an existing SQL database. Be careful, deleting a database will result in loss of all information stored in the database!',
    example: 'DROP DATABASE testDB;',
    practiceQuery: 'SELECT 1; -- Dangerous operation mock',
    difficulty: 'Advanced'
  },
  'alter-table': {
    id: 'alter-table',
    title: 'SQL Alter Table',
    category: 'SQL Database',
    explanation: 'The ALTER TABLE statement is used to add, delete, or modify columns in an existing table. The ALTER TABLE statement is also used to add and drop various constraints on an existing table.',
    example: 'ALTER TABLE Customers ADD Email varchar(255);\nALTER TABLE Customers DROP COLUMN Email;',
    practiceQuery: 'SELECT * FROM information_schema.columns WHERE table_name = \'users\';',
    difficulty: 'Intermediate'
  },
  'primary-key': {
    id: 'primary-key',
    title: 'SQL Primary Key',
    category: 'SQL Database',
    explanation: 'The PRIMARY KEY constraint uniquely identifies each record in a table. Primary keys must contain UNIQUE values, and cannot contain NULL values. A table can have only ONE primary key.',
    example: 'CREATE TABLE Persons (\n    ID int NOT NULL,\n    LastName varchar(255) NOT NULL,\n    PRIMARY KEY (ID)\n);',
    practiceQuery: 'SELECT * FROM information_schema.table_constraints WHERE constraint_type = \'PRIMARY KEY\';',
    difficulty: 'Intermediate'
  },
  'foreign-key': {
    id: 'foreign-key',
    title: 'SQL Foreign Key',
    category: 'SQL Database',
    explanation: 'A FOREIGN KEY is a field (or collection of fields) in one table, that refers to the PRIMARY KEY in another table. The table with the foreign key is called the child table, and the table with the primary key is called the referenced or parent table.',
    example: 'CREATE TABLE Orders (\n    OrderID int NOT NULL,\n    PersonID int,\n    PRIMARY KEY (OrderID),\n    FOREIGN KEY (PersonID) REFERENCES Persons(PersonID)\n);',
    practiceQuery: 'SELECT * FROM information_schema.table_constraints WHERE constraint_type = \'FOREIGN KEY\';',
    difficulty: 'Intermediate'
  },

  // SQL Cert
  'sql-certificate': {
    id: 'sql-certificate',
    title: 'SQL Certificate',
    category: 'SQL Cert',
    explanation: 'Getting a certificate proves your SQL skills to potential employers. SQLForge provides a certification path through our advanced levels and final exam.',
    example: '-- Complete all 50 levels to earn your SQL Master certificate.',
    practiceQuery: 'SELECT count(*) FROM levels;',
    difficulty: 'Advanced'
  },

  // SQL References
  'sql-data-types': {
    id: 'sql-data-types',
    title: 'SQL Data Types',
    category: 'SQL References',
    explanation: 'Each column in a database table is required to have a name and a data type. Common data types include: VARCHAR, INT, FLOAT, DATE, TIMESTAMP, BOOLEAN, and TEXT.',
    example: '-- String types: CHAR, VARCHAR, TEXT\n-- Numeric types: INT, DECIMAL, FLOAT\n-- Date types: DATE, DATETIME, TIMESTAMP',
    practiceQuery: 'SELECT column_name, data_type FROM information_schema.columns WHERE table_name = \'users\';',
    difficulty: 'Beginner'
  },
  'sql-quick-ref': {
    id: 'sql-quick-ref',
    title: 'SQL Quick Ref',
    category: 'SQL References',
    explanation: 'A quick reference guide for common SQL commands. SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, DROP.',
    example: '-- SELECT * FROM table;\n-- INSERT INTO table VALUES (...);\n-- UPDATE table SET col=val WHERE ...;',
    practiceQuery: 'SELECT 1;',
    difficulty: 'Beginner'
  },

  // Advanced Joins
  'sql-natural-join': {
    id: 'sql-natural-join',
    title: 'SQL NATURAL JOIN',
    category: 'Advanced Joins',
    difficulty: 'Intermediate',
    explanation: 'NATURAL JOIN creates an implicit join clause based on common column names in the joined tables.',
    example: 'SELECT * FROM employees NATURAL JOIN departments;'
  },
  'sql-cross-join': {
    id: 'sql-cross-join',
    title: 'SQL CROSS JOIN',
    category: 'Advanced Joins',
    difficulty: 'Intermediate',
    explanation: 'CROSS JOIN produces a Cartesian product of the two tables, matching every row from the first table with every row from the second.',
    example: 'SELECT * FROM products CROSS JOIN colors;'
  },
  'sql-self-join': {
    id: 'sql-self-join',
    title: 'SQL Self Join',
    category: 'Advanced Joins',
    difficulty: 'Intermediate',
    explanation: 'A self join is a regular join, but the table is joined with itself.',
    example: 'SELECT a.name, b.name as manager FROM employees a, employees b WHERE a.manager_id = b.id;'
  },

  // Set Operations
  'sql-intersect': {
    id: 'sql-intersect',
    title: 'SQL INTERSECT',
    category: 'Operations',
    difficulty: 'Intermediate',
    explanation: 'INTERSECT returns the common rows from two SELECT statements.',
    example: 'SELECT id FROM table1 INTERSECT SELECT id FROM table2;'
  },
  'sql-except': {
    id: 'sql-except',
    title: 'SQL EXCEPT',
    category: 'Operations',
    difficulty: 'Intermediate',
    explanation: 'EXCEPT returns rows from the first query that are not present in the second query.',
    example: 'SELECT id FROM table1 EXCEPT SELECT id FROM table2;'
  },

  // Subqueries
  'sql-exists': {
    id: 'sql-exists',
    title: 'SQL EXISTS',
    category: 'Subqueries',
    difficulty: 'Hard',
    explanation: 'The EXISTS operator is used to test for the existence of any record in a subquery.',
    example: 'SELECT name FROM suppliers WHERE EXISTS (SELECT name FROM products WHERE products.supplier_id = suppliers.id);'
  },
  'sql-any-all': {
    id: 'sql-any-all',
    title: 'SQL ANY & ALL',
    category: 'Subqueries',
    difficulty: 'Hard',
    explanation: 'ANY and ALL operators allow you to perform a comparison between a single column value and a range of other values.',
    example: 'SELECT name FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE dept = "IT");'
  },

  // Advanced Analysis
  'sql-window-functions': {
    id: 'sql-window-functions',
    title: 'SQL Window Functions',
    category: 'Advanced Analysis',
    difficulty: 'Hard',
    explanation: 'Window functions perform a calculation across a set of table rows that are somehow related to the current row.',
    example: 'SELECT name, salary, RANK() OVER (ORDER BY salary DESC) FROM employees;'
  },
  'sql-row-number': {
    id: 'sql-row-number',
    title: 'SQL ROW_NUMBER()',
    category: 'Advanced Analysis',
    difficulty: 'Hard',
    explanation: 'Assigns a unique sequential integer to rows within a partition of a result set.',
    example: 'SELECT name, ROW_NUMBER() OVER(PARTITION BY dept ORDER BY salary DESC) FROM employees;'
  },
  'sql-lead-lag': {
    id: 'sql-lead-lag',
    title: 'SQL LEAD & LAG',
    category: 'Advanced Analysis',
    difficulty: 'Hard',
    explanation: 'LEAD and LAG allow you to access data from subsequent or previous rows without a self-join.',
    example: 'SELECT date, sales, LAG(sales) OVER (ORDER BY date) as prev_sales FROM daily_sales;'
  },

  // Optimization
  'sql-cte': {
    id: 'sql-cte',
    title: 'Common Table Expressions (WITH)',
    category: 'Optimization',
    difficulty: 'Hard',
    explanation: 'A CTE provides a temporary result set which you can reference within another SELECT, INSERT, UPDATE, or DELETE statement.',
    example: 'WITH regional_sales AS (SELECT region, SUM(amount) as total FROM sales GROUP BY region) SELECT * FROM regional_sales;'
  },
  'sql-recursive-cte': {
    id: 'sql-recursive-cte',
    title: 'Recursive CTEs',
    category: 'Optimization',
    difficulty: 'Hard',
    explanation: 'A recursive CTE is a CTE that references itself, useful for hierarchical data like organizational charts.',
    example: 'WITH RECURSIVE subordinates AS (SELECT id, name FROM emps WHERE id = 1 UNION SELECT e.id, e.name FROM emps e INNER JOIN subordinates s ON s.id = e.manager_id) SELECT * FROM subordinates;'
  },

  // Performance
  'sql-index-intro': {
    id: 'sql-index-intro',
    title: 'Introduction to Indexing',
    category: 'Performance',
    difficulty: 'Intermediate',
    explanation: 'Indexes are used to retrieve data from the database more quickly than otherwise.',
    example: 'CREATE INDEX idx_lastname ON persons (lastname);'
  },
  'sql-b-tree': {
    id: 'sql-b-tree',
    title: 'B-Tree Indexes',
    category: 'Performance',
    difficulty: 'Hard',
    explanation: 'B-Tree is the default index type for most databases, optimized for range queries and equality.',
    example: 'CREATE INDEX idx_price ON products (price); -- Uses B-Tree by default'
  },
  'sql-execution-plan': {
    id: 'sql-execution-plan',
    title: 'Execution Plans (EXPLAIN)',
    category: 'Performance',
    difficulty: 'Hard',
    explanation: 'The EXPLAIN statement shows how the database intends to execute a query.',
    example: 'EXPLAIN ANALYZE SELECT * FROM users WHERE email = "test@example.com";'
  },

  // Security
  'sql-transactions': {
    id: 'sql-transactions',
    title: 'Database Transactions',
    category: 'Security',
    difficulty: 'Intermediate',
    explanation: 'A transaction is a single unit of work. If it succeeds, all changes are committed; if any part fails, it is rolled back.',
    example: 'BEGIN; UPDATE accounts SET balance = balance - 100 WHERE id = 1; COMMIT;'
  },
  'sql-acid': {
    id: 'sql-acid',
    title: 'ACID Properties',
    category: 'Security',
    difficulty: 'Hard',
    explanation: 'ACID stands for Atomicity, Consistency, Isolation, and Durability - the fundamental properties of a reliable database.',
    example: '-- No specific SQL command, this is a conceptual framework.'
  },
  'sql-isolation-levels': {
    id: 'sql-isolation-levels',
    title: 'Isolation Levels',
    category: 'Security',
    difficulty: 'Hard',
    explanation: 'Isolation levels determine how transaction integrity is visible to other users and systems.',
    example: 'SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;'
  },
  'sql-injection-intro': {
    id: 'sql-injection-intro',
    title: 'SQL Injection Prevention',
    category: 'Security',
    difficulty: 'Intermediate',
    explanation: 'SQL injection is a vulnerability where an attacker can interfere with queries. Always use parameterized queries.',
    example: '-- Use ? or $1 placeholders instead of concatenating strings.'
  },
  'sql-rbac': {
    id: 'sql-rbac',
    title: 'Role-Based Access Control',
    category: 'Security',
    difficulty: 'Hard',
    explanation: 'RBAC allows you to assign permissions to roles and roles to users.',
    example: 'CREATE ROLE editor; GRANT SELECT, UPDATE ON articles TO editor;'
  },

  // Architecture
  'sql-materialized-views': {
    id: 'sql-materialized-views',
    title: 'Materialized Views',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'A materialized view stores the result of a query physically and can be refreshed periodically.',
    example: 'CREATE MATERIALIZED VIEW sales_summary AS SELECT date, SUM(amount) FROM sales GROUP BY date;'
  },
  'sql-stored-procedures': {
    id: 'sql-stored-procedures',
    title: 'Stored Procedures',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'A stored procedure is a prepared SQL code that you can save and reuse.',
    example: 'CREATE PROCEDURE select_all_customers() AS SELECT * FROM customers; GO;'
  },
  'sql-triggers': {
    id: 'sql-triggers',
    title: 'SQL Triggers',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'A trigger is a set of instructions that are executed automatically in response to certain events on a table.',
    example: 'CREATE TRIGGER audit_log AFTER INSERT ON users FOR EACH ROW EXECUTE FUNCTION log_action();'
  },

  // Modern SQL
  'sql-json-data': {
    id: 'sql-json-data',
    title: 'JSON in SQL',
    category: 'Modern SQL',
    difficulty: 'Intermediate',
    explanation: 'Modern SQL databases allow storing and querying semi-structured JSON data.',
    example: 'SELECT profile->>"$.city" FROM users;'
  },
  'sql-upsert': {
    id: 'sql-upsert',
    title: 'UPSERT (ON CONFLICT)',
    category: 'Modern SQL',
    difficulty: 'Intermediate',
    explanation: 'UPSERT allows you to insert a row or update it if it already exists.',
    example: 'INSERT INTO users (id, name) VALUES (1, "Alice") ON CONFLICT (id) DO UPDATE SET name = "Alice";'
  },

  // Database Administration
  'sql-vacuuming': {
    id: 'sql-vacuuming',
    title: 'PostgreSQL VACUUM',
    category: 'Administration',
    difficulty: 'Hard',
    explanation: 'VACUUM reclaims storage occupied by dead tuples. In PostgreSQL, deleted or updated rows are not physically removed until a VACUUM is performed.',
    example: 'VACUUM ANALYZE employees;'
  },
  'sql-wal': {
    id: 'sql-wal',
    title: 'Write-Ahead Logging (WAL)',
    category: 'Administration',
    difficulty: 'Hard',
    explanation: 'WAL is a standard method for ensuring data integrity. It ensures that changes are logged before they are applied to the data files.',
    example: '-- System level configuration: postgresql.conf'
  },
  'sql-backup-restore': {
    id: 'sql-backup-restore',
    title: 'Backup & Restore',
    category: 'Administration',
    difficulty: 'Intermediate',
    explanation: 'Regular backups are essential. pg_dump is the standard utility for backing up a PostgreSQL database.',
    example: 'pg_dump dbname > outfile'
  },

  // Advanced Optimization
  'sql-query-refactoring': {
    id: 'sql-query-refactoring',
    title: 'Query Refactoring',
    category: 'Optimization',
    difficulty: 'Hard',
    explanation: 'Refactoring involves rewriting a query to achieve the same result more efficiently, such as replacing subqueries with joins.',
    example: '-- Original: SELECT * FROM users WHERE id IN (SELECT user_id FROM orders)\n-- Refactored: SELECT DISTINCT u.* FROM users u JOIN orders o ON u.id = o.user_id'
  },
  'sql-denormalization': {
    id: 'sql-denormalization',
    title: 'Denormalization',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'Denormalization is the process of adding redundant data to a database to improve read performance at the cost of write performance.',
    example: '-- Adding total_spent to a users table instead of calculating it from orders every time.'
  },
  'sql-partitioning': {
    id: 'sql-partitioning',
    title: 'Table Partitioning',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'Partitioning refers to splitting what is logically one large table into smaller physical pieces (partitions).',
    example: 'CREATE TABLE measurement_y2023m01 PARTITION OF measurement FOR VALUES FROM ("2023-01-01") TO ("2023-02-01");'
  },
  'sql-sharding': {
    id: 'sql-sharding',
    title: 'Database Sharding',
    category: 'Architecture',
    difficulty: 'Hard',
    explanation: 'Sharding is a type of database partitioning that separates very large databases into smaller, faster, more easily managed parts called data shards.',
    example: '-- Usually handled by middleware or advanced cloud database features (e.g., Citus for PG).'
  },

  // Real-world SQL
  'sql-data-warehousing': {
    id: 'sql-data-warehousing',
    title: 'Data Warehousing (OLAP)',
    category: 'Data Engineering',
    difficulty: 'Intermediate',
    explanation: 'OLAP (Online Analytical Processing) systems are optimized for complex analytical and ad-hoc queries, often using star or snowflake schemas.',
    example: '-- Star Schema: One central Fact table connected to multiple Dimension tables.'
  },
  'sql-etl-process': {
    id: 'sql-etl-process',
    title: 'ETL Processes',
    category: 'Data Engineering',
    difficulty: 'Intermediate',
    explanation: 'ETL (Extract, Transform, Load) is the process of moving data from source systems to a data warehouse.',
    example: '-- Extract: SELECT * FROM production_db;\n-- Transform: Normalize strings, handle nulls;\n-- Load: INSERT INTO analytics_dw;'
  },
  'sql-data-lakes': {
    id: 'sql-data-lakes',
    title: 'SQL on Data Lakes',
    category: 'Data Engineering',
    difficulty: 'Hard',
    explanation: 'Tools like Presto, Athena, or Spark SQL allow running standard SQL queries directly on unstructured data stored in S3 or HDFS.',
    example: 'SELECT * FROM s3_bucket.raw_logs WHERE event_type = "login";'
  },
  'sql-temporal-tables': {
    id: 'sql-temporal-tables',
    title: 'Temporal Tables',
    category: 'Modern SQL',
    difficulty: 'Hard',
    explanation: 'Temporal tables store the history of data changes, allowing you to "time travel" and query the state of data at a specific point in time.',
    example: 'SELECT * FROM products FOR SYSTEM_TIME AS OF "2023-01-01";'
  },
  'sql-no-sql-comparison': {
    id: 'sql-no-sql-comparison',
    title: 'SQL vs NoSQL',
    category: 'Modern SQL',
    difficulty: 'Intermediate',
    explanation: 'Understanding when to use a relational (SQL) database versus a non-relational (NoSQL) database is a key architectural skill.',
    example: '-- Use SQL for complex joins and ACID compliance.\n-- Use NoSQL for massive horizontal scale and flexible schemas.'
  },

  // Final Mastery
  'sql-interview-prep': {
    id: 'sql-interview-prep',
    title: 'SQL Interview Prep',
    category: 'SQL Master',
    difficulty: 'Hard',
    explanation: 'Common interview questions often focus on JOINS, Subqueries, and finding the Nth highest salary.',
    example: 'SELECT DISTINCT salary FROM employees e1 WHERE 3 = (SELECT COUNT(DISTINCT salary) FROM employees e2 WHERE e2.salary >= e1.salary);'
  },
  'sql-the-future': {
    id: 'sql-the-future',
    title: 'The Future of SQL',
    category: 'SQL Master',
    difficulty: 'Beginner',
    explanation: 'SQL has survived for 50 years because it is declarative and powerful. The future includes NewSQL, distributed SQL, and even better integration with AI.',
    example: 'SELECT * FROM sql_future WHERE year > 2026;'
  }
};


