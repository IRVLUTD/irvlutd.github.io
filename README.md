### irvlutd.github.io redirects to [https://labs.utdallas.edu/irvl](https://labs.utdallas.edu/irvl/).

#### **NOTE**: Please don't override the `index.html` in the root folder and delete a specific project branch.

### To create a new project page
- Git clone
    - `git clone https://github.com/IRVLUTD/irvlutd.github.io`
- Create a new branch with project alias. E.g. [FewSOL](https://irvlutd.github.io/FewSOL)
    - `git checkout -b <project-alias>`
- Create a new folder named <project-alias\>
    - `mkdir <project-alias>; cd <project-alias>`
- Place all the necessary files in <project-alias\>. See [FewSOL](https://github.com/IRVLUTD/irvlutd.github.io/tree/main/FewSOL) to get started. `index.html` file used for rendering the project page.
- Commit and push to the <project-alias\> branch
- Create a pull request to the main branch

#### Upon pull request approval, the project page should be live at https://irvlutd.github.io/<project-alias\>
