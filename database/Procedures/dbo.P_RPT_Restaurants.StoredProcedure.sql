USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_Restaurants]    Script Date: 7/10/2018 12:58:44 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_RPT_Restaurants]
--Standard resterault r=details reportiong
--26-08-2018 Created
AS
BEGIN
    SELECT [RESTAURANT_NAME], [RESTAURANT_DESCRIPTION], RESTAURANT_ID
	FROM [dbo].[RESTAURANT]
END
GO
