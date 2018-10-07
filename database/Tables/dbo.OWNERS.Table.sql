USE [book-a-table]
GO
/****** Object:  Table [dbo].[OWNERS]    Script Date: 7/10/2018 12:58:03 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OWNERS](
	[OWNERS_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[USERS_ID] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[OWNERS_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
