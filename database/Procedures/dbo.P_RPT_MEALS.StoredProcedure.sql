USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_MEALS]    Script Date: 7/10/2018 10:55:20 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_RPT_MEALS]
AS
BEGIN

   SELECT [MEAL_ID]
      ,[MEAL_NAME]
      ,[MEAL_DESCRIPTION]
      ,[MEAL_UNIT_PRICE]
      ,[MEAL_UNIT_DESCRIPTION]
      ,[MEAL_INGREDIENT_LIST]
  FROM [dbo].[MEAL]

END
GO
