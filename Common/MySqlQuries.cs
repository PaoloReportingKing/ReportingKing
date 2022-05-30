using Microsoft.Extensions.Configuration;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;

namespace ReportingApp.Common
{
    public class MySqlQuries
    {
        public static int SqlNoResult(string sqlQuery, Dictionary<string, object> parameters)
        {
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            string cs = configurationBuilder.Build().GetSection("ConnectionStrings:DefaultConnection").Value;

            MySqlConnection connection = null;
            int result = 0;
            try
            {
                using (connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(sqlQuery, connection);
                    foreach (KeyValuePair<string, object> item in parameters)
                    {
                        command.Parameters.AddWithValue(item.Key, item.Value);
                    }
                    result = Convert.ToInt32(command.ExecuteScalar());
                }
            }
            catch (Exception ex)
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }

            return result;
        }
        public static DataTable SqlGetResult(string sqlQuery, Dictionary<string, object> parameters)
        {
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            string cs = configurationBuilder.Build().GetSection("ConnectionStrings:DefaultConnection").Value;

            MySqlConnection connection = null;
            var dataTable = new DataTable();
            try
            {
                using (connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(sqlQuery, connection);
                    foreach (KeyValuePair<string, object> item in parameters)
                    {
                        command.Parameters.AddWithValue(item.Key, item.Value);
                    }
                    using (var reader = command.ExecuteReader())
                    {
                        dataTable.Load(reader);
                    }
                }
            }
            catch (Exception ex)
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
            return dataTable;
        }

        public static int DeleteChart(string sqlQuery, Dictionary<string, object> parameters)
        {
            var configurationBuilder = new ConfigurationBuilder();
            string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
            configurationBuilder.AddJsonFile(path, false);
            string cs = configurationBuilder.Build().GetSection("ConnectionStrings:DefaultConnection").Value;

            MySqlConnection connection = null;
            int result = 0;
            try
            {
                using (connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    MySqlCommand command = new MySqlCommand(sqlQuery, connection);
                    foreach (KeyValuePair<string, object> item in parameters)
                    {
                        command.Parameters.AddWithValue(item.Key, item.Value);
                    }
                    result = Convert.ToInt32(command.ExecuteNonQuery());
                }
            }
            catch (Exception ex)
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }
            finally
            {
                if (connection != null)
                {
                    connection.Close();
                }
            }

            return result;
        }
    }
}
