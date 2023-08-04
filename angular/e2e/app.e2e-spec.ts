import { OrderSystemTemplatePage } from './app.po';

describe('OrderSystem App', function() {
  let page: OrderSystemTemplatePage;

  beforeEach(() => {
    page = new OrderSystemTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
