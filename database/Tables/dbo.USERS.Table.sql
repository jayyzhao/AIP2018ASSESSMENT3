USE [book-a-table]
GO
/****** Object:  Table [dbo].[USERS]    Script Date: 7/10/2018 12:58:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USERS](
	[USERS_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[USERS_NAME] [varchar](50) NULL,
	[USERS_FIRST_NAME] [varchar](255) NULL,
	[USERS_LAST_NAME] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[USERS_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
