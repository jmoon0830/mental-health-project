# Mental Health in the Workplace

## Summary
![screenshot](/static/img/mental_screenshot.PNG)

These kaggle datasets contain data on survey polls on how employees perceive its company’s mental health handling. This project seeks to analyze the data to make inferences on what a company can do to increase overall mental health. The team wants to create visualizations based on the findings to compare and understand the data.

This is an article that talks about how important mental health is and how businesses have to look out for its employees mental health.

*[Harvard Study on Mental Health in the Workplace](https://www.health.harvard.edu/newsletter_article/mental-health-problems-in-the-workplace)*

## The Data

![screenshot](/static/img/table_screenshot.PNG)

- Increase awareness in employees by measuring
  (benefits,care_options,wellness_program, seek_help)
- Do your employees feel safe to talk about it
  (coworkers,supervisor,anonymity)
- If you felt that you needed help with mental illness at your company do you think that they would support you? Do you think they would retaliate against you for having a     disability? Would you be comfortable to share this info with your boss and/or coworkers?
- Does those who have symptoms seek out help from employers
- Does these tech companies provide help for those who suffer from mental illness  
- If so what kind of support is offered?
    - Remote work
    - Leave
    - Does gender play role
    - Does age play a role
    - Do these vary depending state

## Analyses

![screenshot](/static/img/map_screenshot.PNG)
The surveys are mapped where red represents large amount of surveys and grey is none. The map is filtered by year to see the difference in survey locations.
Although California had the largest surveys in both years, the survey locations elsewhere seem to change.

![screenshot](/static/img/comfortability_screenshot.PNG)
Three questions that revolved around how comfortable employees felt:
- *Coworkers* - Would you be willing to discuss a mental health issue with your coworkers?
- *Supervisors* - Would you be willing to discuss a mental health issue with your direct supervisor(s)?
- *Anonymity* - Is your anonymity protected if you choose to take advantage of mental health or substance abuse treatment resources?

Although the ratio between yes and no from the supervisors and anonymity questions remain unchanged, there is a significant increase in "Yes" for the coworker's question.
We can assume that from employees felt more safer or comfortable about talking about mental health in the workplace within the two year period.

![screenshot](/static/img/family_history_screenshot.PNG)
Lastly, we wanted to compare the gender demographics in surveys where employees answered "Yes" in regards to having a family history of mental issues.
According to the analysis, there are more males who have a family history of mental health illnesses compared to women.

## Technologies
- Python (Pandas, Jupyter Notebook)
- HTML/CSS/Bootstrap
- JavaScript
- D3, GeoJSON, ChartsJS

## How to Run
Open and run "app.py" in order for flask to render the html
