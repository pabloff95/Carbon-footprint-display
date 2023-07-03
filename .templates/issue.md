# Product Spec

We aim to introduce a basic report for users to reason about their emission data. For this MVP, we are focusing on finding a viable way to **compute and display data** in a scalable way.

### Functional requirements

Enable users to understand a company’s historical emissions by visualizing them in an aggregated form. The report should:

1. Allow to **filter** for a specific company name
2. Aggregate emissions data by month and year, summing the values for each period.
3. **Visualize** the data in a simple chart

### Non-Functional requirements

The report **must load fast**. Please think about how the solution would handle **100x** of data and where you see the need for further work to enable speedy reports while data volume keeps growing. We will have a discussion about this in our follow-up session.

## Definition of done

Submit your solution by opening a PR that contains:

1. A **description of the approach** chosen and your **reasoning** for it
2. **Runnable code** that we can spin up to test-drive your solution
3. In case you don't manage to wrap in time, please create **issues that capture follow-up work**

## Notes

This challenge aims to give us a sense of your skills rather than ship a production-ready solution. In case of unclear requirements, feel free to reach out to us. We are happy to help.

### Prioritization

Delivering a part of the above feature set with **good quality** is more valuable than providing everything in a half-broken state (e.g., prefer a solid API without a frontend over a solution where nothing is fully functional). For that reason, also feel free to take **shortcuts**. It is helpful to call them out in comments or your PR; it helps us understand that you're intentionally taking these shortcuts.

Despite the above, feel free to add any **improvements** to the codebase if you see fit.

### Architecture

You can base your solution on the current Postgres database or change things to your liking (e.g., introduce components such as Redis or a data warehouse) to produce a great outcome. If you do so, please add them to the Docker Compose or mention the SaaS solutions you used within the PR description where we can create trial accounts.

### Dependencies

Feel free to add any necessary dependencies (please explain them in your PR).
