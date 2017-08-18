import { AngularFirebaseMaterialTodoAppPage } from './app.po';

describe('angular-firebase-material-todo-app App', () => {
  let page: AngularFirebaseMaterialTodoAppPage;

  beforeEach(() => {
    page = new AngularFirebaseMaterialTodoAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
