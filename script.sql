USE [master]
GO
/****** Object:  Database [Denemedb]    Script Date: 10.01.2023 21:06:41 ******/
CREATE DATABASE [Denemedb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Denemedb', FILENAME = N'D:\Games\MSSQL15.MSSQLSERVER\MSSQL\DATA\Denemedb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Denemedb_log', FILENAME = N'D:\Games\MSSQL15.MSSQLSERVER\MSSQL\DATA\Denemedb_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Denemedb] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Denemedb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Denemedb] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Denemedb] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Denemedb] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Denemedb] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Denemedb] SET ARITHABORT OFF 
GO
ALTER DATABASE [Denemedb] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Denemedb] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Denemedb] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Denemedb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Denemedb] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Denemedb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Denemedb] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Denemedb] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Denemedb] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Denemedb] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Denemedb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Denemedb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Denemedb] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Denemedb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Denemedb] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Denemedb] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Denemedb] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Denemedb] SET RECOVERY FULL 
GO
ALTER DATABASE [Denemedb] SET  MULTI_USER 
GO
ALTER DATABASE [Denemedb] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Denemedb] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Denemedb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Denemedb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Denemedb] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Denemedb] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Denemedb', N'ON'
GO
ALTER DATABASE [Denemedb] SET QUERY_STORE = OFF
GO
USE [Denemedb]
GO
/****** Object:  Table [dbo].[BookComments]    Script Date: 10.01.2023 21:06:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookComments](
	[BookId] [int] NOT NULL,
	[IsRecommended] [varchar](50) NOT NULL,
	[Datee] [date] NOT NULL,
	[Username] [varchar](150) NOT NULL,
	[BookComment] [varchar](2000) NOT NULL,
	[CommentId] [int] IDENTITY(1,1) NOT NULL,
	[AddedComment] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Books]    Script Date: 10.01.2023 21:06:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Books](
	[BookId] [int] IDENTITY(1,1) NOT NULL,
	[BookName] [varchar](100) NOT NULL,
	[BookAuthor] [varchar](50) NOT NULL,
	[Category] [varchar](50) NOT NULL,
	[BookSummary] [varchar](2000) NULL,
	[BookCover] [varchar](2000) NULL,
 CONSTRAINT [PK_Books] PRIMARY KEY CLUSTERED 
(
	[BookId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CreateEvent]    Script Date: 10.01.2023 21:06:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CreateEvent](
	[EventId] [int] IDENTITY(1,1) NOT NULL,
	[BookName] [varchar](50) NOT NULL,
	[EnrolledUsers] [int] NOT NULL,
	[Comments] [varchar](250) NULL,
	[EventType] [varchar](50) NOT NULL,
	[EventDate] [date] NOT NULL,
	[EventTime] [datetime] NOT NULL,
	[SetDisabled] [bit] NULL,
	[CounterEnrolled] [int] NULL,
 CONSTRAINT [PK_CreateEvent] PRIMARY KEY CLUSTERED 
(
	[EventId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRegistration]    Script Date: 10.01.2023 21:06:41 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRegistration](
	[UserId] [int] IDENTITY(1,1) NOT NULL,
	[Username] [varchar](150) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[FavouriteBook] [varchar](70) NOT NULL,
	[UserPassword] [varchar](50) NOT NULL,
	[UserAvatar] [varchar](2000) NULL,
 CONSTRAINT [PK_UserRegistration] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BookComments] ADD  DEFAULT ((0)) FOR [AddedComment]
GO
ALTER TABLE [dbo].[CreateEvent] ADD  DEFAULT ((0)) FOR [SetDisabled]
GO
ALTER TABLE [dbo].[CreateEvent] ADD  DEFAULT ((0)) FOR [CounterEnrolled]
GO
ALTER TABLE [dbo].[UserRegistration] ADD  DEFAULT ('https://localhost:3000/avatars/avatar1.png') FOR [UserAvatar]
GO
USE [master]
GO
ALTER DATABASE [Denemedb] SET  READ_WRITE 
GO
