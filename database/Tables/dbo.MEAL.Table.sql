USE [book-a-table]
GO
/****** Object:  Table [dbo].[MEAL]    Script Date: 7/10/2018 9:22:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MEAL](
	[MEAL_ID] [bigint] IDENTITY(1,1) NOT NULL,
	[MEAL_NAME] [varchar](255) NULL,
	[MEAL_DESCRIPTION] [varchar](1000) NULL,
	[MEAL_UNIT_PRICE] [money] NULL,
	[MEAL_UNIT_DESCRIPTION] [varchar](50) NULL,
	[MEAL_INGREDIENT_LIST] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[MEAL_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
