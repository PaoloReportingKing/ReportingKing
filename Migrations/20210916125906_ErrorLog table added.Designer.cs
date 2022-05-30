﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ReportingApp.Data;

namespace ReportingApp.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210916125906_ErrorLog table added")]
    partial class ErrorLogtableadded
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ReportingApp.Models.ErrorLog", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ErrorMessage")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Location")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("ErrorLogs");
                });

            modelBuilder.Entity("ReportingApp.Models.PaymentGatewayDetail", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Paypal_ClientId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("Paypal_Secret")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("TestMode")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("PaymentGatewayDetails");
                });

            modelBuilder.Entity("ReportingApp.Models.UserManagement.ComponentRight", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<bool>("Add")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Delete")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Description")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<bool>("Edit")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("HiddenDescription")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("PackagePlanId")
                        .HasColumnType("int");

                    b.Property<bool>("View")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("ComponentRights");
                });

            modelBuilder.Entity("ReportingApp.Models.UserManagement.PackagePlan", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("PackageName")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("PackagePlans");
                });

            modelBuilder.Entity("ReportingApp.Models.UserManagement.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("IsSuperAdmin")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("LastPaymentDate")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("NextPaymentDate")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<int>("PackagePlanId")
                        .HasColumnType("int");

                    b.Property<string>("Password")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("PaymentSoFor")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("SubscriptionId")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("email")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("googleaccountid")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("locale")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.Property<string>("name")
                        .HasColumnType("longtext CHARACTER SET utf8mb4");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
