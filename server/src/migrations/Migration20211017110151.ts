import { Migration } from '@mikro-orm/migrations';

export class Migration20211017110151 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "animal" drop column "color_color_scheme";');
  }

}
