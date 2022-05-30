using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ReportingApp.Migrations
{
    public partial class lastnextpaymentdateandpaymentsofor : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastPaymentDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "NextPaymentDate",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<decimal>(
                name: "PaymentSoFor",
                table: "Users",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastPaymentDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "NextPaymentDate",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PaymentSoFor",
                table: "Users");
        }
    }
}
