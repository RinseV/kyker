import { Migration } from '@mikro-orm/migrations';

export class Migration20220101084109 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "animal" drop constraint if exists "animal_disabled_check";');
    this.addSql('alter table "animal" alter column "disabled" type bool using ("disabled"::bool);');
    this.addSql('alter table "animal" alter column "disabled" set not null;');

    this.addSql('alter table "spotting" add column "visibility" int4 null, add column "traffic" int4 null;');
  }

}
