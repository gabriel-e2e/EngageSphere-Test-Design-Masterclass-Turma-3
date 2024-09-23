# Test cases

Below is a list of possible test cases that could be covered by automated scripts for the **EngageSphere** application.

## API tests

- It returns the correct status and body structure
- It paginates the customer list correctly
- It filters limit of customers correctly
- It filters customers by size correctly
- It filters customers by industry correctly
- It handles invalid requests gracefully (e.g., negative page)
- It handles invalid requests gracefully (e.g., negative limit)
- It handles invalid requests gracefully (e.g., page as a string)
- It handles invalid requests gracefully (e.g., limit as a boolean)
- It handles invalid requests gracefully (e.g., unsupported size)
- It handles invalid requests gracefully (e.g., unsupported industry)

## GUI/Component tests

- It keeps the filters when coming back from the customer details view
- It filters by Small size
- It filters by Medium size
- It filters by Enterprise size
- It filters by Large Enterprise size
- It filters by Very Large Enterprise size
- It filters by Logistics industry
- It filters by Retail industry
- It filters by Technology industry
- It filters by HR industry
- It filters by Finance industry
- It persists the limit of items per page in the local storage when changing the limit
- It goes back to the customers list when clicking the "Back" button
- It shows the image of an empty box and the text "No customers available." when there are no customers in the database
- It disables the name text input field when there are no customers in the database
- It finds no a11y issues in light mode in the customer table
- It finds no a11y issues in dark mode in the customer table
- It finds no a11y issues in light mode in the customer details and address view
- It finds no a11y issues in dark mode in the customer details and address view
- It shows a Loading... fallback element before the initial customers' fetch
- It accepts the cookies
- It declines the cookies
- It renders the contact details of a customer
- It renders a fallback paragraph ('No contact info available') when contact details are not available
- It shows and hides the customer address
- It renders a fallback paragraph ('No address available') when address is not available
- It correctly downloads a list of customers as a CSV file
- It renders the footer with the right text and links
- It renders the "Hi there" greeting when no name is provided
- It renders the "Hi Joe" greeting when name is provided
- It renders the header with a heading, theme's toggle, and a text input field
- It changes to the dark mode then back to light mode
- It opens and closes the messenger
- It makes sure all messenger's fields are mandatory and the first one is focused
- It shows and hides a success message when successfully submitting the messenger form
- It clears all the messenger's form fields when filling them, closing the messenger, and opening it again
- It finds on a11y issues with the messenger's bubble button in dark mode
- It renders in the middle page (both Prev and Next buttons are enabled)
- It renders in the first of two pages (Prev button is disabled)
- It renders in the last of two pages (Next button is disabled)
- It renders the Prev and Next buttons disabled when there is only one page
- It renders with a limit of 50 items per page
- It shows a list of customers when there's data in the database
- It sorts by Size in descending order by default
- It sorts by Size in ascending order
- It sorts by Number of employees in descending order
- It sorts by Number of employees in ascending order
- It shows the Company name and Action columns, and hides the ID, Industry, Number of Employees, and Size columns in a mobile viewport
