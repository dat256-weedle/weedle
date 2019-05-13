# Social contract - Group Weedle

## Level of ambition

The group aims for a grade of 5.
Goal with the project: create the best possible work-process for using SCRUM to create a product of value.

## Being on time

The members of the group will show up to meetings in time. It is disrespectful towards to the group to not follow this. If a member of the group is unable to arrive on time they will immediately inform the group of this.

## Communication

The communication in the group is done through Slack and through the meetings of the group.

## Deadlines

All turn-ins are officially handed (Group and individual) in on Mondays. Individual reflections, however, have an internal deadline on sundays. 

## Workload

We respect that the group members should  work 20 hours per week, and we won't
force people to work on weekends to get done with an unfinished user story. All course
activities counts, including meetings, lectures and lecture feedback.

## Group structure

The group has a SCRUM master / group leader and a secretary.
**Project manager**: Makes sure that there is an agenda before each meeting and keeps track of the meetings order of business. Also makes sure that the individual assignments are turned in on time.
**Secretary**: Writes a protocol for each meeting and makes sure this exists on GitHub after the meeting.

The group decided to make **Pontus Lindblom** the SCRUM master and **Oscar Östberg** the secretary.

Additional roles and their responsibilities within the group are declared under the headline Scrum.

## Meeting times

The group has meetings on Mondays 08:00-17:00 and Thursdays 10:00-12:00.

## Meeting protocol

The protocol is written directly in GitHub by the secretary.

## Decision-making

At least 5 members of the group need to be present in order to make a group decision, and there need to be a majority in order for the decision to pass. Should the vote result in a draw then no decision is made and the decision will be taken at later date.

## Personal- and group-conflicts

If a personal conflict arises it should be resolved by the involved parties if possible. If the conflict is a problem for the group it will be resolved with the group where at least 5 people participate, including the involved persons.

## Scrum

### Definition of Done

The code should

- compile
- be tested to the best of the abilities of the programmer
- satisfy the acceptance criteria
- satisfy the code conventions
- be approved by the product owner(s)
- be merged into the deveop-branch

### Responsibilities of Scrum master

The SCRUM master will make sure that the members have turned in their parts for the team's deadlines.

Create the agenda for and lead the groups meetings. (The scrum master holds the responsibilities of the project manager)

### Responsibilities of Product- and Vice Product Owner

Prioritize and approve the set of user stories for each sprint. Approve and criticize user stories with their acceptance criteria as basis during sprint demo.

Vice product owner is in charge when the product owner is the one delivering a user story.

If the product owner and the vice product owner are unable to agree, the product owner has the final word.

### Daily scrum

Each day (from course-week 3) a daily SCRUM meeting will be held over Slack. Each morning (on work-days) before 10:00 each member of the group will write a message containing the following:

- What you have done since yesterday.
- Problems you might need help with.
- What you're going to do today.

## Coding Conventions

- All code and comments will be written in English.
- Git commit messages should be short, concise and sufficiently describe what has changed.
- All PR:s should be reviewed by at least 3 other members of the group.
- No force pushes to master / develop should be made.
- The person who created a pull request is also the person that merges it.
- TODO:s are not allowed.

### Branch Naming

When creating a branch in git follow the naming scheme below

- feature/user-story-title
- fix/bug-fix-title
- test/test-title
- docs/document-title

### Folder Structure

For the project we should put all source files in a folder called ``src`` and structure them depending on the function of said source files. GUI components get individual folders under a folder called ``usage`` depending on features. Backend components get individual folders under a folder called ``backend`` based on component. Common
components get individual folders under ``common``. Types are defined in a single file in the root of the ``src`` folder and should be named ``types.ts``. An example of said structure is as follows:

```Filesystem
src
├─┬ backend
│ └─┬ database
│   └── database.ts
├─┬ common
│ └─┬ button
│   └── Button.tsx
├─┬ usage
│ └─┬ map
│   ├── MapButton.tsx
│   └── Map.tsx
└─types.ts
```

## Dependencies and Tools

* User stories: GitHub
* Language: TypeScript
* Language library: React Native


## How the social contract is changed

The person who brings up a change to the social contract is responsible to implement it into the contract, as long as the group agrees. Everyother week the social contract is reviewed at a weekly meeting by the entire group. 
