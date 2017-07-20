import { JovenesAClient.CLIPage } from './app.po';

describe('jovenes-a-client.cli App', () => {
  let page: JovenesAClient.CLIPage;

  beforeEach(() => {
    page = new JovenesAClient.CLIPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
