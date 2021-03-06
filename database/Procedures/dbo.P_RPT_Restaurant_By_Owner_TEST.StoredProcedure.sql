USE [book-a-table]
GO
/****** Object:  StoredProcedure [dbo].[P_RPT_Restaurant_By_Owner_TEST]    Script Date: 7/10/2018 9:22:24 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[P_RPT_Restaurant_By_Owner_TEST]
@USERS_ID NVARCHAR(50)
AS
BEGIN
    


	declare @test BIGINT = cast(@USERS_ID as BIGINT)

    SELECT RESTAURANT_ID, RESTAURANT_NAME, RESTAURANT_DESCRIPTION
	FROM [dbo].[RESTAURANT]
	INNER JOIN [dbo].[OWNERS] on Owners.OWNERS_ID = RESTAURANT.OWNERS_ID
	WHERE OWNERS.USERS_ID = @test
END
GO
