# Student Management System

The Student Management System is a web-based application designed to assist educational institutions in efficiently managing student information. This system offers a range of features that enable users to maintain organized and up-to-date student records.

## Features

### Add New Student
- Users can add a new student to the system by providing essential information such as ID, name, date of birth, GPA, gender, level, status, department, email, and mobile number.
- The student's data is securely stored in the local storage for easy retrieval and management.

### Update Student Information
- Users have the ability to edit existing student records, modifying fields such as name, date of birth, GPA, gender, level, status, email, and mobile number.
- The department field is disabled for editing to ensure consistency in the student's department throughout the system.

### Delete Student Data
- The system allows users to delete student data from the database.
- A confirmation dialogue is displayed to prevent accidental deletion of important information.

### Search for Students
- Users can search for active students by name using the search feature.
- The system displays a table of students with similar names and active status, allowing for quick access to specific student information.

### Assign Department to Student
- Users can assign a department to a student through the student's department assignment page.
- The page provides the student's ID, name, and a dropdown list of available departments.
- This feature is only applicable to students with a level of 3. If the user attempts to assign a department to a student with a different level, an error message will be displayed.

### View All Students
- The system provides a comprehensive table displaying all active and inactive students.
- Only relevant attributes are shown, allowing users to easily view all students' information in one place.

### Change Student Status
- Users can update a student's status from active to inactive or vice versa directly from the table view of all students.
- This feature enables quick updates to a student's status without requiring the editing of their complete profile.

### Navigation Bar
- The system features a well-designed navigation bar that facilitates easy navigation between pages.
- Users can access all system features quickly and efficiently through the navigation bar.

## Installation

To install and run the Student Management System, follow these steps:

1. Clone the repository to your local machine.
2. Make sure you have a compatible web server and database management system set up.
3. Import the provided database schema into your database management system.
4. Configure the necessary connection settings in the system's configuration files.
5. Deploy the application to your web server.
6. Access the application through a web browser.

## Usage

Once the Student Management System is installed and running, you can begin managing student information by performing the following actions:

- Add new students to the system by providing their details.
- Update existing student information as needed.
- Delete student records if necessary.
- Search for specific students by name.
- Assign departments to students of the appropriate level.
- View all active and inactive students in a comprehensive table.
- Change a student's status from active to inactive or vice versa.
- Navigate through the system using the provided navigation bar.

## Contributing

Contributions to the Student Management System are welcome! If you would like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Commit your changes and push them to your fork.
5. Submit a pull request, explaining the changes you have made.

Please ensure that your contributions align with the project's coding standards and guidelines.
