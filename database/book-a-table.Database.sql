USE [master]
GO
/****** Object:  Database [book-a-table]    Script Date: 20/08/2018 7:36:34 PM ******/
CREATE DATABASE [book-a-table]
GO
ALTER DATABASE [book-a-table] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [book-a-table].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [book-a-table] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [book-a-table] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [book-a-table] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [book-a-table] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [book-a-table] SET ARITHABORT OFF 
GO
ALTER DATABASE [book-a-table] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [book-a-table] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [book-a-table] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [book-a-table] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [book-a-table] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [book-a-table] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [book-a-table] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [book-a-table] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [book-a-table] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [book-a-table] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [book-a-table] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [book-a-table] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [book-a-table] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [book-a-table] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [book-a-table] SET  MULTI_USER 
GO
ALTER DATABASE [book-a-table] SET DB_CHAINING OFF 
GO
ALTER DATABASE [book-a-table] SET ENCRYPTION ON
GO
ALTER DATABASE [book-a-table] SET QUERY_STORE = ON
GO
ALTER DATABASE [book-a-table] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 7), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 10, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO)
GO
USE [book-a-table]
GO
ALTER DATABASE SCOPED CONFIGURATION SET DISABLE_BATCH_MODE_ADAPTIVE_JOINS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET DISABLE_BATCH_MODE_MEMORY_GRANT_FEEDBACK = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET DISABLE_INTERLEAVED_EXECUTION_TVF = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_ONLINE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ELEVATE_RESUMABLE = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET IDENTITY_CACHE = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET ISOLATE_SECURITY_POLICY_CARDINALITY = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET OPTIMIZE_FOR_AD_HOC_WORKLOADS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_PROCEDURE_EXECUTION_STATISTICS = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET XTP_QUERY_EXECUTION_STATISTICS = OFF;
GO
ALTER DATABASE [book-a-table] SET  READ_WRITE 
GO
