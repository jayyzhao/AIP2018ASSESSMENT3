USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_Restaurants]    Script Date: 27/08/2018 8:32:39 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[P_RPT_Restaurants]
--Standard resterault r=details reportiong
--26-08-2018 Created
AS
BEGIN
    SELECT [RESTAURANT_NAME], [RESTAURANT_DESCRIPTION]
	FROM [dbo].[RESTAURANT]
END
GO
