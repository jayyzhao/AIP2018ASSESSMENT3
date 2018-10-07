USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_FOOD_BY_BOOKING]    Script Date: 7/10/2018 12:58:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_RPT_FOOD_BY_BOOKING]
@BOOKING_ID BIGINT
AS
BEGIN

	DECLARE @ORDER_ID BIGINT = (SELECT [ORDER_ID] FROM [dbo].[ORDERS] WHERE [BOOKING_ID] = @BOOKING_ID)

	SELECT ORDER_ITEM.ORDER_ID, ORDER_ITEM.ORDER_ITEM_ID ,[ORDER_ITEM].[ORDER_ITEM_QUANTITY], MEAL.[MEAL_NAME], MEAL.[MEAL_DESCRIPTION], MEAL.[MEAL_UNIT_PRICE]
	FROM [dbo].[ORDER_ITEM]
	INNER JOIN [dbo].[MEAL] ON MEAL.MEAL_ID = ORDER_ITEM.MEAL_ID
	WHERE [ORDER_ITEM].ORDER_ID = @ORDER_ID

END
GO
