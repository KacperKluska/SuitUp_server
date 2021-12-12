module.exports.ProductCategory1638031178913 = class ProductCategory1638031178913 {
  name = 'ProductCategory1638031178913';

  async up(queryRunner) {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" SERIAL NOT NULL, "category" character varying(50) NOT NULL, CONSTRAINT "UQ_dab3b9cd30b5940f3a808316991" UNIQUE ("category"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "categoriesId" integer`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b31522e7a7f93ef47f311590a79" FOREIGN KEY ("categoriesId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b31522e7a7f93ef47f311590a79"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoriesId"`);
    await queryRunner.query(`DROP TABLE "category"`);
  }
};
