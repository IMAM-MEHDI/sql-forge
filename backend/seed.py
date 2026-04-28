import sys
import os

# Ensure absolute imports work when running this script directly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal
from models import Level

def seed_level_1():
    db = SessionLocal()
    
    # Check if level already exists
    existing_level = db.query(Level).filter(Level.title.like("Level 1%")).first()
    if existing_level:
        print("Level 1 already exists!")
        db.close()
        return

    level1 = Level(
        title="Level 1: Employee Retrieval",
        description="Your first task is simple: the HR department has lost their employee spreadsheet. Write a SQL query to retrieve ALL columns and rows from the `employees` table so they can rebuild it.",
        difficulty="Easy",
        topic="Basic SELECT",
        schema_definition="""
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary INT,
    active BOOLEAN
);

INSERT INTO employees (name, department, salary, active) VALUES 
('Alice Johnson', 'Engineering', 85000, true),
('Bob Smith', 'Marketing', 62000, false),
('Charlie Brown', 'Sales', 54000, true),
('Diana Prince', 'Engineering', 95000, true);
        """,
        expected_output=[
            {"id": 1, "name": "Alice Johnson", "department": "Engineering", "salary": 85000, "active": True},
            {"id": 2, "name": "Bob Smith", "department": "Marketing", "salary": 62000, "active": False},
            {"id": 3, "name": "Charlie Brown", "department": "Sales", "salary": 54000, "active": True},
            {"id": 4, "name": "Diana Prince", "department": "Engineering", "salary": 95000, "active": True}
        ]
    )

    db.add(level1)
    db.commit()
    print("Successfully seeded Level 1!")

def seed_level_2():
    db = SessionLocal()
    
    # Check if level already exists
    existing_level = db.query(Level).filter(Level.title.like("Level 2%")).first()
    if existing_level:
        print("Level 2 already exists!")
        db.close()
        return

    level2 = Level(
        title="Level 2: Filtering Departments",
        description="The Engineering lead needs a list of their team members. Write a SQL query to retrieve all columns from the `employees` table, but ONLY for those who work in the 'Engineering' department.",
        difficulty="Easy",
        topic="WHERE Clause",
        schema_definition="""
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary INT,
    active BOOLEAN
);

INSERT INTO employees (name, department, salary, active) VALUES 
('Alice Johnson', 'Engineering', 85000, true),
('Bob Smith', 'Marketing', 62000, false),
('Charlie Brown', 'Sales', 54000, true),
('Diana Prince', 'Engineering', 95000, true);
        """,
        expected_output=[
            {"id": 1, "name": "Alice Johnson", "department": "Engineering", "salary": 85000, "active": True},
            {"id": 4, "name": "Diana Prince", "department": "Engineering", "salary": 95000, "active": True}
        ]
    )

    db.add(level2)
    db.commit()
    print("Successfully seeded Level 2!")

def seed_level_3():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 3%")).first():
        print("Level 3 already exists!")
        db.close()
        return

    level3 = Level(
        title="Level 3: Salary Sorting",
        description="The finance department needs to analyze payroll. Retrieve all columns from the `employees` table, but order the results by `salary` from highest to lowest (descending).",
        difficulty="Easy",
        topic="ORDER BY",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), department VARCHAR(50), salary INT, active BOOLEAN);
INSERT INTO employees (name, department, salary, active) VALUES 
('Alice Johnson', 'Engineering', 85000, true),
('Bob Smith', 'Marketing', 62000, false),
('Charlie Brown', 'Sales', 54000, true),
('Diana Prince', 'Engineering', 95000, true);
        """,
        expected_output=[
            {"id": 4, "name": "Diana Prince", "department": "Engineering", "salary": 95000, "active": True},
            {"id": 1, "name": "Alice Johnson", "department": "Engineering", "salary": 85000, "active": True},
            {"id": 2, "name": "Bob Smith", "department": "Marketing", "salary": 62000, "active": False},
            {"id": 3, "name": "Charlie Brown", "department": "Sales", "salary": 54000, "active": True}
        ]
    )
    db.add(level3)
    db.commit()
    print("Successfully seeded Level 3!")
    db.close()

def seed_level_4():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 4%")).first():
        db.close()
        return

    level4 = Level(
        title="Level 4: Department Headcount",
        description="Management needs a headcount report. Write a query that returns the `department` name and the total number of employees in that department as `employee_count`.",
        difficulty="Medium",
        topic="GROUP BY",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), department VARCHAR(50), salary INT, active BOOLEAN);
INSERT INTO employees (name, department, salary, active) VALUES 
('Alice Johnson', 'Engineering', 85000, true),
('Bob Smith', 'Marketing', 62000, false),
('Charlie Brown', 'Sales', 54000, true),
('Diana Prince', 'Engineering', 95000, true);
        """,
        expected_output=[
            {"department": "Engineering", "employee_count": 2},
            {"department": "Marketing", "employee_count": 1},
            {"department": "Sales", "employee_count": 1}
        ]
    )
    db.add(level4)
    db.commit()
    print("Successfully seeded Level 4!")
    db.close()

def seed_level_5():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 5%")).first():
        db.close()
        return

    level5 = Level(
        title="Level 5: High Earners",
        description="Find departments where the average salary is greater than 70,000. Return the `department` and the `avg_salary`.",
        difficulty="Hard",
        topic="HAVING Clause",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), department VARCHAR(50), salary INT, active BOOLEAN);
INSERT INTO employees (name, department, salary, active) VALUES 
('Alice Johnson', 'Engineering', 85000, true),
('Bob Smith', 'Marketing', 62000, false),
('Charlie Brown', 'Sales', 54000, true),
('Diana Prince', 'Engineering', 95000, true);
        """,
        expected_output=[
            {"department": "Engineering", "avg_salary": 90000.0}
        ]
    )
    db.add(level5)
    db.commit()
    print("Successfully seeded Level 5!")
    db.close()

def seed_level_6():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 6%")).first():
        db.close()
        return

    level6 = Level(
        title="Level 6: Joining Teams",
        description="Connect the `employees` and `departments` tables. Retrieve the employee `name` and their `department_name` using an INNER JOIN.",
        difficulty="Medium",
        topic="INNER JOIN",
        schema_definition="""
CREATE TABLE departments (id SERIAL PRIMARY KEY, dept_name VARCHAR(50));
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), dept_id INT);

INSERT INTO departments (dept_name) VALUES ('Engineering'), ('Marketing'), ('Sales');
INSERT INTO employees (name, dept_id) VALUES 
('Alice Johnson', 1),
('Bob Smith', 2),
('Charlie Brown', 3),
('Diana Prince', 1);
        """,
        expected_output=[
            {"name": "Alice Johnson", "dept_name": "Engineering"},
            {"name": "Bob Smith", "dept_name": "Marketing"},
            {"name": "Charlie Brown", "dept_name": "Sales"},
            {"name": "Diana Prince", "dept_name": "Engineering"}
        ]
    )
    db.add(level6)
    db.commit()
    print("Successfully seeded Level 6!")
    db.close()

def seed_level_7():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 7%")).first():
        db.close()
        return

    level7 = Level(
        title="Level 7: Empty Departments",
        description="Find all departments and any employees assigned to them. Use a LEFT JOIN so that departments without employees (like 'Research') still appear in the list with a NULL name.",
        difficulty="Medium",
        topic="LEFT JOIN",
        schema_definition="""
CREATE TABLE departments (id SERIAL PRIMARY KEY, dept_name VARCHAR(50));
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), dept_id INT);

INSERT INTO departments (dept_name) VALUES ('Engineering'), ('Marketing'), ('Research');
INSERT INTO employees (name, dept_id) VALUES ('Alice', 1), ('Bob', 2);
        """,
        expected_output=[
            {"dept_name": "Engineering", "name": "Alice"},
            {"dept_name": "Marketing", "name": "Bob"},
            {"dept_name": "Research", "name": None}
        ]
    )
    db.add(level7)
    db.commit()
    print("Successfully seeded Level 7!")
    db.close()

def seed_level_8():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 8%")).first():
        db.close()
        return

    level8 = Level(
        title="Level 8: Above Average",
        description="Write a subquery to find all employees whose `salary` is higher than the average salary of all employees in the company.",
        difficulty="Hard",
        topic="Subqueries",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), salary INT);
INSERT INTO employees (name, salary) VALUES 
('Alice', 90000), ('Bob', 60000), ('Charlie', 70000), ('Diana', 110000);
        """,
        expected_output=[
            {"id": 1, "name": "Alice", "salary": 90000},
            {"id": 4, "name": "Diana", "salary": 110000}
        ]
    )
    db.add(level8)
    db.commit()
    print("Successfully seeded Level 8!")
    db.close()

def seed_level_9():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 9%")).first():
        db.close()
        return

    level9 = Level(
        title="Level 9: Project Assignments",
        description="Count how many employees are assigned to each project. Return the `project_name` and the count as `member_count`.",
        difficulty="Hard",
        topic="Many-to-Many JOIN",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100));
CREATE TABLE projects (id SERIAL PRIMARY KEY, project_name VARCHAR(100));
CREATE TABLE employee_projects (emp_id INT, proj_id INT);

INSERT INTO employees (name) VALUES ('Alice'), ('Bob'), ('Charlie');
INSERT INTO projects (project_name) VALUES ('Apollo'), ('Zeus');
INSERT INTO employee_projects (emp_id, proj_id) VALUES (1, 1), (2, 1), (3, 2);
        """,
        expected_output=[
            {"project_name": "Apollo", "member_count": 2},
            {"project_name": "Zeus", "member_count": 1}
        ]
    )
    db.add(level9)
    db.commit()
    print("Successfully seeded Level 9!")
    db.close()

def seed_level_10():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 10%")).first():
        db.close()
        return

    level10 = Level(
        title="Level 10: Department Payroll CTE",
        description="Use a Common Table Expression (WITH clause) named `dept_costs` to calculate the total salary per department, then select everything from that CTE.",
        difficulty="Hard",
        topic="CTEs",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), dept VARCHAR(50), salary INT);
INSERT INTO employees (name, dept, salary) VALUES 
('Alice', 'Eng', 90000), ('Bob', 'Eng', 80000), ('Charlie', 'Sales', 60000);
        """,
        expected_output=[
            {"dept": "Eng", "total_payroll": 170000},
            {"dept": "Sales", "total_payroll": 60000}
        ]
    )
    db.add(level10)
    db.commit()
    print("Successfully seeded Level 10!")
    db.close()

def seed_level_11():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 11%")).first():
        db.close()
        return

    level11 = Level(
        title="Level 11: Aggregate Extremes",
        description="The management wants to know the salary range. Find the `MIN(salary)` as `min_salary` and `MAX(salary)` as `max_salary` from the `employees` table.",
        difficulty="Easy",
        topic="Aggregate Functions",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), salary INT);
INSERT INTO employees (name, salary) VALUES ('Alice', 90000), ('Bob', 60000), ('Charlie', 75000), ('Diana', 120000);
        """,
        expected_output=[{"min_salary": 60000, "max_salary": 120000}]
    )
    db.add(level11)
    db.commit()
    print("Successfully seeded Level 11!")
    db.close()

def seed_level_12():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 12%")).first():
        db.close()
        return

    level12 = Level(
        title="Level 12: Pattern Matching",
        description="Find all employees whose names start with the letter 'A'. Use the `LIKE` operator with a wildcard.",
        difficulty="Easy",
        topic="LIKE Wildcards",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100));
INSERT INTO employees (name) VALUES ('Alice'), ('Aaron'), ('Bob'), ('Charlie'), ('Anna');
        """,
        expected_output=[{"name": "Alice"}, {"name": "Aaron"}, {"name": "Anna"}]
    )
    db.add(level12)
    db.commit()
    print("Successfully seeded Level 12!")
    db.close()

def seed_level_13():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 13%")).first():
        db.close()
        return

    level13 = Level(
        title="Level 13: Range & Sets",
        description="Retrieve all employees who earn between 70,000 and 100,000 (inclusive) AND work in either 'Sales' or 'Marketing'. Use `BETWEEN` and `IN`.",
        difficulty="Medium",
        topic="IN & BETWEEN",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), dept VARCHAR(50), salary INT);
INSERT INTO employees (name, dept, salary) VALUES 
('Alice', 'Sales', 85000), ('Bob', 'Marketing', 95000), ('Charlie', 'Eng', 120000), ('Diana', 'Sales', 60000);
        """,
        expected_output=[
            {"name": "Alice", "dept": "Sales", "salary": 85000},
            {"name": "Bob", "dept": "Marketing", "salary": 95000}
        ]
    )
    db.add(level13)
    db.commit()
    print("Successfully seeded Level 13!")
    db.close()

def seed_level_14():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 14%")).first():
        db.close()
        return

    level14 = Level(
        title="Level 14: Logic with CASE",
        description="Create a salary category report. Select `name`, `salary`, and a new column `category` that says 'High' if salary > 90000, and 'Regular' otherwise.",
        difficulty="Hard",
        topic="CASE Statement",
        schema_definition="""
CREATE TABLE employees (id SERIAL PRIMARY KEY, name VARCHAR(100), salary INT);
INSERT INTO employees (name, salary) VALUES ('Alice', 100000), ('Bob', 80000), ('Charlie', 110000);
        """,
        expected_output=[
            {"name": "Alice", "salary": 100000, "category": "High"},
            {"name": "Bob", "salary": 80000, "category": "Regular"},
            {"name": "Charlie", "salary": 110000, "category": "High"}
        ]
    )
    db.add(level14)
    db.commit()
    print("Successfully seeded Level 14!")
    db.close()

def seed_level_15():
    db = SessionLocal()
    if db.query(Level).filter(Level.title.like("Level 15%")).first():
        db.close()
        return

    level15 = Level(
        title="Level 15: Combining Results",
        description="Combine the names from both the `current_staff` and `legacy_staff` tables into a single list of names using `UNION`.",
        difficulty="Medium",
        topic="UNION",
        schema_definition="""
CREATE TABLE current_staff (name VARCHAR(100));
CREATE TABLE legacy_staff (name VARCHAR(100));
INSERT INTO current_staff VALUES ('Alice'), ('Bob');
INSERT INTO legacy_staff VALUES ('Charlie'), ('Diana');
        """,
        expected_output=[
            {"name": "Alice"}, {"name": "Bob"}, {"name": "Charlie"}, {"name": "Diana"}
        ]
    )
    db.add(level15)
    db.commit()
    print("Successfully seeded Level 15!")
    db.close()

if __name__ == "__main__":
    seed_level_1()
    seed_level_2()
    seed_level_3()
    seed_level_4()
    seed_level_5()
    seed_level_6()
    seed_level_7()
    seed_level_8()
    seed_level_9()
    seed_level_10()
    seed_level_11()
    seed_level_12()
    seed_level_13()
    seed_level_14()
    seed_level_15()
