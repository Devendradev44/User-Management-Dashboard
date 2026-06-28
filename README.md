# User Management Dashboard

## Overview

A React + TypeScript CRUD application that manages users using the JSONPlaceholder REST API.

## Features

* View all users
* Add a new user
* Edit an existing user
* Delete a user
* Search users
* Sort by columns
* Pagination
* Filter by First Name, Last Name, Email, and Department
* Client-side validation
* Responsive layout
* Error handling

## Tech Stack

* React
* TypeScript
* Vite
* Axios

## Installation

```bash
git clone <repository-url>

cd user-management-dashboard

npm install

npm run dev
```

## Build

```bash
npm run build
```

## Assumptions

* JSONPlaceholder provides only 10 users.
* POST, PUT, and DELETE requests are simulated by JSONPlaceholder and do not persist after page refresh.
* Department is assigned locally for demonstration purposes.

## Challenges Faced

* Managing local state for CRUD operations while using a mock REST API.
* Implementing search, sorting, pagination, and filters together without conflicts.
* Handling temporary updates because JSONPlaceholder does not persist changes.

## Future Improvements

* Server-side pagination
* Authentication
* Better modal components
* Dark mode
* Unit test coverage
* Persistent backend database
