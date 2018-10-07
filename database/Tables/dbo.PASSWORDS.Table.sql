USE [book-a-table]
GO
/****** Object:  Table [dbo].[PASSWORDS]    Script Date: 7/10/2018 12:58:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PASSWORDS](
	[PASSWORDS_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[USERS_ID] [bigint] NULL,
	[Password_Encrypted] [nvarchar](255) NULL,
	[Password] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[PASSWORDS_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
