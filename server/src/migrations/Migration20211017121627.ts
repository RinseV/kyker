import { Migration } from '@mikro-orm/migrations';

export class Migration20211017121627 extends Migration {
    async up(): Promise<void> {
        this.addSql('alter table "animal" add column "disabled" bool default false;');
    }
}
