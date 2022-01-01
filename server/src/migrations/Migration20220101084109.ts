import { Migration } from '@mikro-orm/migrations';

export class Migration20220101084109 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "spotting" add column "visibility" int4 null, add column "traffic" int4 null;');
  }

}
