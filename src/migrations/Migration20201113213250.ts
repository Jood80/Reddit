import { Migration } from '@mikro-orm/migrations';

export class Migration20201113213250 extends Migration {

  async up(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
