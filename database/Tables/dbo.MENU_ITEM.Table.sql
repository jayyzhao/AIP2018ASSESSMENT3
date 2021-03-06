USE [book-a-table]
GO
/****** Object:  Table [dbo].[MENU_ITEM]    Script Date: 7/10/2018 9:22:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MENU_ITEM](
	[MENU_ITEM_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[MENU_ID] [bigint] NULL,
	[MEAL_ID] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[MENU_ITEM_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
