import Handlebars from 'handlebars';
import fs from 'fs/promises';

const pages = ['index', 'macos', 'ios', 'charging', 'finance'];

Handlebars.registerPartial('header', await fs.readFile('partials/header.hbs', 'utf8'));
Handlebars.registerPartial('navigation', await fs.readFile('partials/navigation.hbs', 'utf8'));
Handlebars.registerPartial('footer', await fs.readFile('partials/footer.hbs', 'utf8'));

await Promise.all(pages.map(async page => {
  const template = Handlebars.compile(await fs.readFile(`templates/${page}.hbs`, 'utf8'));
  await fs.writeFile(`public/${page}.html`, template({}), 'utf8');
}));
