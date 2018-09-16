USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_Restaurant_Details]    Script Date: 16/09/2018 6:30:30 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_RPT_Restaurant_Details] 
@RESTAURANT_ID bigint
AS
BEGIN
    SELECT [RESTAURANT_NAME], [RESTAURANT_DESCRIPTION], [MENU_NAME], [MENU_DESCRIPTION], [MENU].MENU_ID
	FROM [dbo].[RESTAURANT]
	INNER JOIN [dbo].[MENU] on [MENU].MENU_ID = RESTAURANT.MENU_ID
	WHERE [RESTAURANT_ID] = @RESTAURANT_ID
END



GO
